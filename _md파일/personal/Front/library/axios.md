```json
// 응답스키마()
{
  data:{},  // 응답데이터
  status:200, // status code
  statusText: 'OK', // status code 와 연계해서 사용, 따로 수정x
  headers:{},
  config:{},
  request:{}
}


// 실패스키마
{
  message : '오류 메세지',
  response : {응답스키마},
  request : {},
  config :{}
}


```


[[library]]