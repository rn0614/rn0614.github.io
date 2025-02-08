import styles from "./style.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
const components = {
  img: (props: any) => <img {...props} src={props.src.replace("public", "")} />, //public 주소만 제외
  a:(props:any) => <a {...props} href={`/${props.href}`}/>
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
