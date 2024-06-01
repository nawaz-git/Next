'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    const { email, password } = data;
    try {
      const response: any = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      console.log(response);
      if (!response.error) {
        router.push('/');
      } else {
        console.error('Login Failed:', response.error);
        setError(response.error);
      }
    } catch (error: any) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-64 mx-auto'
    >
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='email'
          type='text'
          placeholder='Enter your email'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-red-500 text-xs italic'>{errors.email.message}</p>
        )}
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'
        >
          Password
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='password'
          type='password'
          placeholder='Enter your password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-red-500 text-xs italic'>
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging you In....' : 'Login'}
      </button>
    </form>
  );
}
