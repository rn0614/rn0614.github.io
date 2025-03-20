// falsy한 값 조정
// 속성값이 비어있거나 속성자체가 없으면 빔 {}, {a:[]}
// 빈 문자열 빔
// null, undefined 빔
// 1번 문제
function isEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isEmpty);
  }

  if (typeof value === "object") {
    return Object.values(value).every((item) => isEmpty(item));
  }

  return false;
}
console.log(isEmpty(null));
console.log(isEmpty({}));
console.log(isEmpty(0));
console.log(isEmpty([{}, { a: [] }]));

// 2번 문제 pass

// 3번 문제
const units = ["", "만", "억", "조", "경", "해", "자"];

// 숫자, 최대한국식 단위 수, 1000 미만 반올림 여부
function solution(num, maxKoreaUnitCount, roundDownUnder1K = false) {
  let roundDouwnNum = num;
  if (roundDownUnder1K) {
    roundDouwnNum = (Math.round(+num / 10000) * 10000).toString();
  }

  const [integerPart, fractionalPart] = roundDouwnNum.split(".");

  const splitedPart = [];
  for (let i = integerPart.length; i > 0; i -= 4) {
    const part = integerPart.slice(Math.max(0, i - 4), i);
    splitedPart.unshift(Number(part).toLocaleString()); // ['1,222','2,332']
  }

  // for(let i=0; i<integerPart.length; i+=4){
  //   splited4Length.push(Number(integerPart.split("").reverse().slice(i, i+4).reverse().join('')).toLocaleString());
  // }
  let result = "";
  for (let i = 0; i < splitedPart.length; i++) {
    let curVal = splitedPart[i];
    if (curVal === "0") continue;
    if (maxKoreaUnitCount > 0) {
      result += ` ${curVal}${units[splitedPart.length - i - 1]}`;
      maxKoreaUnitCount--;
    }
  }

  if (!roundDownUnder1K && fractionalPart) {
    result += "." + fractionalPart;
  }

  return console.log("result", result);
}

solution("1234567890", "1", false);
solution("9876543210", "2", true);
solution("123.456789", "1", false);

// 4번 고객 정보 보호
// 마스킹 관련 로직
function solution1(obj) {
  // 객체를 받았을 때 객체안의 요소를 돌면서 확인하는 코드
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    Object.entries(obj).map(([key, value]) => {
      result[key] = solution1(value);
    });
    return result;
  }

  // 내부 value 값이 string이라면 해당하는 string 개선 코드
  if (typeof obj === "string") {
    const phoneNumReg = /\d{2,3}-\d{3,4}-\d{4}/;
    const nameReg = /[가-힣]{3,4}님/;
    const cardValidationPeriodReg = /\d{2}\/\d{2}/;
    const emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
    const paymentReg = /\d+원/;

    if (phoneNumReg.test(obj)) {
      return obj
        .split("-")
        .map((item, idx) => {
          return idx === 1 ? item.slice(0, item.length - 2) + "**" : item;
        })
        .join("-");
    } else if (cardValidationPeriodReg.test(obj)) {
      return obj
        .split("/")
        .map((item, idx) => {
          return idx === 0 ? "**" : item;
        })
        .join("/");
    } else if (emailReg.test(obj)) {
      return obj.split(/[@.]/).reduce((acc, item, idx) => {
        if (idx === 0) {
          return (acc += maskingByLenght(item));
        } else if (idx === 1) {
          return (acc += "@" + maskingByLenght(item));
        }
        return acc + "." + item;
      }, "");
    } else if (paymentReg.test(obj)) {
      return "*".repeat(obj.length - 1) + "원";
    } else if (nameReg.test(obj)) {
      return maskingByLenght(obj.slice(0, obj.length - 1)) + "님";
    } else {
      return maskingByLenght(obj);
    }

    // 들어오는 값 구분, 이메일, 이름, 금액(), 유효기간(/포함), 전화번호(- 포함)
  }
}

function maskingByLenght(str) {
  const len = str.length;
  const maskingMiddle = (str, maskCount) => {
    const start = Math.floor((len - maskCount) / 2);
    return (
      str.slice(0, start) + "*".repeat(maskCount) + str.slice(start + maskCount)
    );
  };

  if (str.length >= 7) {
    return maskingMiddle(str, 3);
  } else if (str.length >= 4) {
    return maskingMiddle(str, 2);
  } else {
    return maskingMiddle(str, 1);
  }
}

console.log(solution1("rn0614@naver.com"));
console.log(solution1("2000원"));
console.log(solution1("11/32"));
console.log(solution1("구상모님"));
console.log(solution1("구상모구님"));
console.log(solution1("구상모구님123"));
console.log(
  solution1({
    name: "구상모님",
    email: "rn0614@naver.com",
    paymentValidation: "06/24",
  })
);

// 배치처리 시스템.
// 일정기간동안 일어난 이벤트 수집, 구현된 batch 함수로 한번에 실행
// batchOption으로는 {size: 3, time: 10000}
class BatchedEventSystem {
  batchList = [];
  constructor(batchOption) {
    this.batchOption = batchOption;
  }

  next(value) {
    this.batchList.push(value);
  }

  subscribe(listnear) {
    setTimeout(() => {
      listnear();
    }, this.batchOption.time);
  }

  unsubscribe(listnearToRmove) {
    if (listnearToRmove === undefined) {
      this.batchList = [];
    }
    return this.batchList.filter((item) => item !== listnearToRmove);
  }
}

// cur 에 현재 작업, processQueue에는 다음작업부터 순서대로 들어있음
// 만약 cur이나 processQueue에 동일한 key값의 작업이 들어있다면 그 Promise를 반환
//
// 중복요청 막기
class AsyncJobManager {
  constructor(work) {
    this.work = work;
    this.currentJob = null;
    this.jobQueue = [];
    this.isRunning = false;
  }

  start(args) {
    if (this.currentJob === null) {
      this.isRunning = true;
      this.currentJob = { id: args, promise: this.work(args) };
    }

    // 받은 작업이 현재 작업이라면 현재작업 prmise 반환
    if (this.currentJob.id == args.id) {
      return this.currentJob.promise;
    }

    //받은 작업이 queue에 있다면 queue에 있는 promise반환
    const isCurjobInQueue = this.jobQueue.filter((job) => job.id === args);
    if (isCurjobInQueue.length > 0) {
      return isCurjobInQueue[0].promise;
    }

    //받은 작업이 현재작업/queue에 없다면 queue에 넣기
    this.jobQueue.push({ id: args, promise: this.work(args) });

    //queue실행
    this.processQueue();
  }

  //
  async processQueue() {
    if (this.jobQueue.length === 0) {
      // ? 현재 작업도 없다면 종료처리?
    }

    this.currentJob = this.jobQueue.shift();
  }

  reset() {
    if (this.isRunning) return;
    this.jobQueue = [];
  }
}

const fetchData = async (id) => {
  return `Data for Id: ${id}`;
};

const jobManager = new AdvancedAsyncJobManager(fetchData);
jobManager.start(1).then((result) => console.log(result));
jobManager.start(2).then((result) => console.log(result)); //첫작업 완료까지 대기 이후출력2
jobManager.start(1).then((result) => console.log(result)); // 첫작업 끝날 때가지 대기 이후 출력 1

setTimeout(() => {
  jobManager.start(3).then((result) => console.log(result));
}, 1500);
