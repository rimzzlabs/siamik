import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelola Dosen | SIAMIK Amiks Serang',
  description: 'Kelola data dosen | SIAMIK Amik Serang',
}
export default function Layout(props: React.PropsWithChildren) {
  return props.children
}
