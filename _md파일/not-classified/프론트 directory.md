> nextjs 기준으로 글을 작성함

package.json과 package-lock.json 차이
package.json은 버전을 range로 관리하고 package-lock.json은 명확한 버전을 제시함.

npm이 node_modules트리 또는 package.json을 수정할 때 package-lock.json도 수정이 이루어짐.

빌드시에는 package-lock.json을 참조하여 빌드된다.