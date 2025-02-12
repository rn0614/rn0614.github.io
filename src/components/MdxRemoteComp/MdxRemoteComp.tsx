import styles from "./style.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
const components = {
  img: (props: any) => <img {...props} src={props.src.replace("public", "")} />, //public 주소만 제외
  a:(props:any) => <a {...props} href={`/${props.href}`}/>,
  h1:(props:any) => <h2 {...props}/>,
  h3:(props:any) => <h3 {...props}/>,
  h4:(props:any) => <h4 {...props}/>,
  h5:(props:any) => <h5 {...props}/>,
  h6:(props:any) => <h6 {...props}/>
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
