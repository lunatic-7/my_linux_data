import { Outlet } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/features/settings/components/sidebar-nav'
import { JSX } from 'react'

export function TwoColumnLayout({
  title,
  description,
  sidebarNavItems,
  children,
}: {
  title: string
  description: string
  sidebarNavItems: { title: string; href: string; icon: JSX.Element }[]
  children: React.ReactNode
}) {
  return (
    <>
      <div className='space-y-0.5'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          {title}
        </h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <Separator className='my-4 lg:my-6' />
      {children}
      <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex w-full overflow-y-hidden p-1'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
