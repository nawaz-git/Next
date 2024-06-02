import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-row min-h-screen'>
      <Sidebar />
      <div className='w-full'>{children}</div>
    </section>
  );
}
