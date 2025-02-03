/**
 * handler 처리
 * 동기함수도 비동기 처리로 순차적으로 처리하도록 변경함.
 */

const combineHandlers = <E extends React.SyntheticEvent>(
  ...handlers: Array<((event: E) => void | Promise<void>) | undefined>
): ((event: E) => Promise<void>) => async (event: E) => {
  for (const handler of handlers) {
    if (handler) await handler(event); // 비동기 핸들러를 지원
  }
};

export default combineHandlers;
