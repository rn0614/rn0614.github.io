import styles from "./style.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
const components = {
  img: (props: any) => <img {...props} src={props.src.replace("public", "")} loading="lazy"/>, //public 주소만 제외
  a: (props: any) => {
    // href가 없는 경우 처리
    if (!props.href) {
      return <a {...props} />;
    }
    
    // 절대 경로인 경우 (http:// 또는 https://로 시작)
    if (props.href.startsWith('http://') || props.href.startsWith('https://')) {
      return <a {...props} />;
    }
    
    // 상대 경로인 경우
    let href = props.href;
    // .md 확장자 제거
    if (href.endsWith('.md')) {
      href = href.slice(0, -3);
    }
    // 맨 앞에 / 추가 (이미 있는 경우 제외)
    if (!href.startsWith('/')) {
      href = `/${href}`;
    }
    
    return <a {...props} href={href} />;
  },
  h1:(props:any) => <h1 {...props}/>,
  h2:(props:any) => <h2 {...props}/>,
  h3:(props:any) => <h3 {...props}/>,
  h4:(props:any) => <h4 {...props}/>,
  h5:(props:any) => <h5 {...props}/>,
  h6:(props:any) => <h6 {...props}/>,
  pre:(props:any) => <pre {...props} className={styles.mdPre}/>
};

export default function MdxRenderer({
  source,
}: {
  source: string|undefined;
}) {
  if (source === undefined) return <div>no</div>;
  return (
    <div className={styles.mdxWrapper}>
      <MDXRemote source={source} components={components} options={{mdxOptions:{remarkPlugins:[remarkGfm]}}}/>
    </div>
  );
}
