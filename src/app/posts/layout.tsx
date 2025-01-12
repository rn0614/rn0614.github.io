import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
      <header>헤더입니다</header>
      <div>{children}</div>
    </div>
  )
}
