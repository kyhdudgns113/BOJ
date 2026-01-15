// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const recordArr = inputArr.slice(1).map(row => row.trim().split(' '))

// 댄스를 추는 사람들을 저장하는 변수
const dancers = {}
dancers['ChongChong'] = 1

// 연산
recordArr.forEach(record => {
  const [A, B] = record

  // true 로 저장하면 안된다. constructor 같은 이름이 들어오면 난감해진다.
  if (dancers[A] === 1 || dancers[B] === 1) {
    dancers[A] = 1
    dancers[B] = 1
  }
})

// 댄서가 된 사람들의 수를 구한다
const result = Object.keys(dancers).length

// 출력
process.stdout.write(`${result}`)
