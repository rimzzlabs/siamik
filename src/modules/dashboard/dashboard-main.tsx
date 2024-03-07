import { cn } from '#/lib/utils'

export function DashboardMain(props: React.ComponentPropsWithoutRef<'main'>) {
  return (
    <main
      className={cn(
        'pt-[var(--navbar-height)] lg:pl-[var(--sidebar-width)]',
        props.className,
      )}
    >
      <div className='p-4'>{props.children}</div>
    </main>
  )
}
