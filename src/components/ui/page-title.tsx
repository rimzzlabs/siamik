type TPageTitleProps = {
  title: string
}

export function PageTitle(props: TPageTitleProps) {
  return (
    <section className='flex items-center justify-between py-4'>
      <h1 className='text-2xl lg:text-4xl font-bold'>{props.title}</h1>
    </section>
  )
}
