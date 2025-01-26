import React, { useEffect, useState } from "react";

const withMobileVisibility = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const userAgent =
        navigator.userAgent || "";
      const isMobileAgent = /mobile|android|iphone|ipad/i.test(userAgent);
      setIsMobile(isMobileAgent);
    }, []);

    if (isMobile) return null; // 모바일 환경이 아니면 렌더링하지 않음

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withMobileVisibility;