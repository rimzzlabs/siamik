export function DashboardMain(props: React.PropsWithChildren) {
  return (
    <main className='pt-[var(--navbar-height)] pl-[var(--sidebar-width)]'>
      <div className='p-4'>{props.children}</div>
    </main>
  )
}
