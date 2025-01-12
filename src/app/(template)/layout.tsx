export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
      <header>헤더입니다</header>
      <div>{children}</div>
      <footer>Footer입니다.</footer>
    </div>
  )
}
