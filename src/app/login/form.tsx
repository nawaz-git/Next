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
    <div className='min-h-screen bg-white flex'>
      <div className='flex flex-1 bg-[#09090b] justify-center items-start h-screen w-full flex-col'>
        <div className='px-48 flex flex-col gap-2'>
          <h1 className='text-5xl text-[#fafafa] font-bold'>finOpsly.</h1>
          <span className='text-2xl text-[#a29faa]'>
            Uncover Hidden Costs, Enhance Profitability
          </span>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Log In
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <div>
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
                <p className='text-red-500 text-xs italic'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='mt-4'>
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
            <div className='mt-4'>
              <button
                type='submit'
                className='w-full bg-[#09090b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging you In....' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
