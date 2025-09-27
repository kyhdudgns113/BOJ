/**
 * 1-4. 1008 A/B
 *
 * 입력
 *   A, B: 10 미만의 자연수
 *
 * 출력
 *   A/B 의 값. 절대오차 혹은 상대오차가 10^-9 이하면 정답
 */
const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split(' ')
let [A, B] = input

A = parseInt(A)
B = parseInt(B)

let result = A / B
result = result.toString()

process.stdout.write(result)
