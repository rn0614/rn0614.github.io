import React, { useState, useEffect } from "react";

const withVisibility = <P extends object>(
  MobileComponent: React.ComponentType<P> | null,
  WebComponent: React.ComponentType<P> | null,
  WebViewComponent: React.ComponentType<P> | null = null
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const [environment, setEnvironment] = useState<
      "mobile" | "webview" | "desktop" | null
    >(null);

    useEffect(() => {
      const detectEnvironment = () => {
        const isWebView = !!(window as any).ReactNativeWebView; // WebView 여부 체크
        const isDesktopMobile = window.innerWidth <= 768; // 모바일 브라우저 판별

        if (isWebView) {
          setEnvironment("webview");
        } else if (isDesktopMobile) {
          setEnvironment("mobile");
        } else {
          setEnvironment("desktop");
        }
      };

      detectEnvironment(); // 첫 렌더링 시 한번 실행
      window.addEventListener("resize", detectEnvironment);
      return () => window.removeEventListener("resize", detectEnvironment);
    }, []);

    if (environment === null) return null; // 초기 렌더링 시 미표시

    if (environment === "mobile")
      return MobileComponent ? <MobileComponent {...props} /> : null;
    
    // WebView 환경이면서 WebViewComponent가 `null`이면 MobileComponent를 사용
    if (environment === "webview") {
      if (WebViewComponent) {
        return <WebViewComponent {...props} />;
      } else if (MobileComponent) {
        return <MobileComponent {...props} />;
      }
      return null;
    }
    return WebComponent ? <WebComponent {...props} /> : null;
  };

  return WrappedComponent;
};

export default withVisibility;
