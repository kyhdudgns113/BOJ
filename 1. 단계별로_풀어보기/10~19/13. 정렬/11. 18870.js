// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const XArr = inputArr[1].split(' ').map(Number)

// key 저장할 변수
const dict = {}

// 중복없이 저장
XArr.forEach(x => (dict[x] = 0))

// Key 값만 추출 후 정렬
const keyArr = Object.keys(dict).sort((a, b) => a - b)

// Key 값들 인덱스 저장
keyArr.forEach((key, idx) => (dict[key] = idx))

// 출력용 변수. 출력함수를 한 번만 호출하기위해 선언
let result = ''

XArr.forEach(X => (result += `${dict[X]} `))

// 출력
process.stdout.write(result)
