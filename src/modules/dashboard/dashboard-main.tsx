export function DashboardMain(props: React.PropsWithChildren) {
  return (
    <main className='pt-[var(--navbar-height)] lg:pl-[var(--sidebar-width)]'>
      <div className='p-4'>{props.children}</div>
    </main>
  )
}
