import {
  POST_BASE_PATH,
  getAllPostsList,
  parsePost,
} from "../../../../lib/posts";
import path from "path";
import { PostDetailType } from "@/types/types";
import { Metadata } from "next";
import MdxRenderer from "@/components/MdxRemoteComp/MdxRemoteComp";
import { Heading } from "@radix-ui/themes";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  const posts = getAllPostsList();
  return posts.map((post: any) => {
    // 경로에서 .md 확장자 제거
    const cleanSlug = post.slug.replace(/\.md$/, '');

    // POST_BASE_PATH 이후의 경로만 추출
    const relativePath = cleanSlug.slice(POST_BASE_PATH.length + 1);

    // 경로를 슬래시로 분리
    const pathParts = relativePath.split(path.sep);

    // 각 경로 부분을 인코딩 (이중 인코딩 방지)
    const encodedParts = pathParts.map((part: string) => {
      // 이미 인코딩된 부분이 있는지 확인
      try {
        // 디코딩 시도
        const decoded = decodeURIComponent(part);
        // 디코딩 성공 시 원본 값 사용
        return part;
      } catch (e) {
        // 디코딩 실패 시 인코딩
        return encodeURIComponent(part);
      }
    });

    return {
      slugs: encodedParts,
    };
  });
}

// 여기에 동적 metatag 생성
export async function generateMetadata({
  params,
}: {
  params: PostDetailType;
}): Promise<Metadata> {
  const pathSlugs = (params.slugs as string[]).map((slug) =>
    decodeURIComponent(slug)
  );
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}.md`;

  const postInfo = parsePost(postPath);
  if (!postInfo) {
    return {
      title: "Post Not Found",
      description: "This post does not exist.",
    };
  }
  // title 속성이 없으면 제목이 title, title도 없다면 default 로 제목 미정
  const showTitle =
    postInfo?.title || pathSlugs[pathSlugs.length - 1].replace(".md", "") || "제목 미정";

  // URL 생성을 위한 경로 처리
  const urlPath = pathSlugs
    .map(slug => encodeURIComponent(slug))
    .join('/');

  return {
    title: showTitle,
    description: postInfo?.excerpt || showTitle,
    keywords: postInfo?.tags,
    openGraph: {
      title: showTitle,
      description: postInfo?.excerpt || showTitle,
    },
  };
}

// 페이지 컴포넌트
export default async function PostPage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const pathSlugs = ((await params).slugs as string[]).map((slug) =>
    decodeURIComponent(slug)
  );
  // 파일 시스템 경로 생성
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}.md`;
  const postInfo = parsePost(postPath); // 이미 인코딩 상태로 path에 들어감
  if (postInfo === undefined) return <div>no data</div>;
  return (
    <main
      className="markdown-body"
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        paddingInline: "20px",
        minWidth: "0",
      }}
    >
      <Heading as="h1">
        {decodeURIComponent(pathSlugs[pathSlugs.length - 1].replace(".md", ""))}
      </Heading>
        <p>npm은 Node.js와 함께 기본 제공되는 패키지 매니저입니다. 그러나 많은 개발자들이 Yarn이나 pnpm을 선택하는 이유는 성능, 의존성 관리, 캐싱 및 워크스페이스 지원 등의 측면에서 몇 가지 강점을 제공하기 때문입니다.</p>
        <h2>1. 설치 속도</h2>
        <ul>
          <li><strong>npm:</strong>
            <ul>
              <li>초기 버전은 패키지를 순차적으로 설치하여 느렸으나, 최신 버전에서는 병렬 설치 기능이 도입되어 개선됨.</li>
              <li>여전히 프로젝트별로 <code>node_modules</code>에 설치하므로, 동일 패키지가 여러 프로젝트에서 중복될 수 있음.</li>
            </ul>
          </li>
          <li><strong>Yarn:</strong>
            <ul>
              <li>패키지들을 병렬로 설치하여 전체 설치 시간이 빠름.</li>
              <li>강력한 글로벌 캐싱 메커니즘으로 이미 다운로드된 패키지를 빠르게 재사용함.</li>
            </ul>
          </li>
          <li><strong>pnpm:</strong>
            <ul>
              <li>콘텐츠 기반 저장소(Content-addressable storage)를 사용해, 동일한 패키지를 전역 캐시에 저장 후, 프로젝트별 <code>node_modules</code>에 심볼릭 링크 방식으로 연결.</li>
              <li>이 방식은 설치 속도를 극대화하고 디스크 공간도 절약함.</li>
            </ul>
          </li>
        </ul>
        <h2>2. 캐싱 매커니즘</h2>
        <ul>
          <li><strong>npm:</strong>
            <ul>
              <li>한 번 다운로드된 패키지는 글로벌 캐시(보통 <code>~/.npm</code>)에 저장되어 동일 버전의 패키지를 재설치할 때 재사용됨.</li>
              <li>하지만, 최종적으로는 각 프로젝트 내의 <code>node_modules</code> 폴더에 설치됩니다.</li>
            </ul>
          </li>
          <li><strong>Yarn:</strong>
            <ul>
              <li>전역 캐시(예: <code>~/.cache/yarn</code>)에 패키지를 저장하고, 콘텐츠 기반 해싱을 통해 같은 패키지 버전을 여러 프로젝트에서 공유합니다.</li>
              <li>이를 통해 네트워크 요청을 줄이고 설치 속도를 높일 수 있습니다.</li>
            </ul>
          </li>
          <li><strong>pnpm:</strong>
            <ul>
              <li>전역 저장소에 패키지를 저장한 후, 프로젝트의 <code>node_modules</code>에는 해당 패키지에 대한 심볼릭 링크를 생성합니다.</li>
              <li>이 방식은 디스크 공간을 효율적으로 사용하면서, 동일 패키지를 여러 번 다운로드하지 않아 빠른 설치가 가능합니다.</li>
            </ul>
          </li>
        </ul>
        <h2>3. 의존성 관리 및 워크스페이스 지원</h2>
        <ul>
          <li><strong>npm:</strong>
            <ul>
              <li><code>package-lock.json</code> 파일을 사용하여 의존성 버전을 고정합니다.</li>
              <li>npm v7부터 워크스페이스 기능을 지원하여 모노레포 관리가 가능해졌습니다.</li>
            </ul>
          </li>
          <li><strong>Yarn:</strong>
            <ul>
              <li><code>yarn.lock</code> 파일을 사용해 결정론적(Deterministic) 의존성 관리를 제공, 모든 환경에서 동일한 설치 결과를 보장합니다.</li>
              <li>초기부터 워크스페이스를 지원하여, 여러 패키지를 포함한 대규모 프로젝트에서 인기가 높습니다.</li>
            </ul>
          </li>
          <li><strong>pnpm:</strong>
            <ul>
              <li>pnpm 또한 lock 파일과 강력한 워크스페이스 지원을 제공하며, 중복 설치 없이 패키지를 공유함으로써 효율적인 프로젝트 관리를 돕습니다.</li>
            </ul>
          </li>
        </ul>
        <h2>4. 비교 표</h2>
        <table><thead><tr><th><strong>요소</strong></th><th><strong>npm</strong></th><th><strong>Yarn</strong></th><th><strong>pnpm</strong></th></tr></thead><tbody><tr><td><strong>설치 속도</strong></td><td>최신 버전에서 개선되었지만, 여전히 프로젝트별 설치</td><td>병렬 설치와 강력한 캐싱으로 매우 빠름</td><td>글로벌 캐시와 심볼릭 링크로 빠르며 디스크 공간 절약</td></tr><tr><td><strong>캐싱 메커니즘</strong></td><td>글로벌 캐시(<code>~/.npm</code>) 존재, 프로젝트별 설치 필수</td><td>글로벌 캐시(<code>~/.cache/yarn</code>)와 콘텐츠 기반 해싱 사용</td><td>글로벌 저장소를 활용해 중복 다운로드 방지 및 심볼릭 링크 사용</td></tr><tr><td><strong>의존성 관리</strong></td><td><code>package-lock.json</code>으로 관리</td><td><code>yarn.lock</code> 파일로 결정론적 관리</td><td>Lock 파일과 링크 기법으로 효율적 관리</td></tr><tr><td><strong>워크스페이스 지원</strong></td><td>npm v7부터 지원</td><td>초기부터 강력한 워크스페이스 지원</td><td>워크스페이스 지원을 통한 효율적 관리</td></tr><tr><td><strong>CLI 경험</strong></td><td>익숙하지만 경우에 따라 느릴 수 있음</td><td>빠르고 직관적인 명령어 제공</td><td>npm과 유사한 인터페이스로 높은 성능 제공</td></tr></tbody></table>
        <h3>파일시스템 구성여부</h3>
        <table><thead><tr><th>파일 이름</th><th>npm</th><th>Yarn</th><th>pnpm</th></tr></thead><tbody><tr><td><strong>package.json</strong></td><td>존재 (공통)</td><td>존재 (공통)</td><td>존재 (공통)</td></tr><tr><td><strong>Lock 파일</strong></td><td>package-lock.json (사용)</td><td>yarn.lock (사용)</td><td>pnpm-lock.yaml (사용)</td></tr><tr><td><strong>node_modules</strong></td><td>각 프로젝트에 생성</td><td>각 프로젝트에 생성</td><td>각 프로젝트에 생성 (글로벌 캐시 + 심볼릭 링크 방식 사용)</td></tr></tbody></table>
        <h2>5. 결론</h2>
        <ul>
          <li>
            <p><strong>빠른 설치와 효율성:</strong>
              Yarn과 pnpm은 병렬 설치와 강력한 글로벌 캐시 메커니즘 덕분에 npm보다 훨씬 빠르게 의존성을 설치할 수 있습니다.</p>
          </li>
          <li>
            <p><strong>일관된 의존성 관리:</strong>
              결정론적인 lock 파일(<code>yarn.lock</code> 또는 pnpm의 lock 파일)을 사용하여, 협업 환경에서 모든 개발자가 동일한 패키지 트리를 사용할 수 있습니다.</p>
          </li>
          <li>
            <p><strong>워크스페이스와 모노레포 지원:</strong>
              특히 Yarn과 pnpm은 대규모 프로젝트나 모노레포에서 효율적인 의존성 관리와 디스크 공간 절약 측면에서 강점을 보입니다.</p>
          </li>
        </ul>
        <p>이러한 요소들 때문에 많은 개발자들이 기본 npm 대신 Yarn이나 pnpm을 선택하여 더 빠르고 일관된 개발 환경을 구축하고 있습니다.</p>
    </main>
  );
}
