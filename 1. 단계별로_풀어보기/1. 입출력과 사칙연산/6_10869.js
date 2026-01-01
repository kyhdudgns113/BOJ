/**
 * 1-5. 10869 사칙연산
 *
 * 입력
 *   A, B : 10,000 이하의 자연수
 *
 * 출력
 *   A + B
 *   A - B
 *   A * B
 *   A / B (몫만)
 *   A % B
 *   를 각각 한 줄씩 출력한다.
 */

const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split(' ')
let [A, B] = input
A = parseInt(A)
B = parseInt(B)

const resultSum = (A + B).toString()
const resultSub = (A - B).toString()
const resultMul = (A * B).toString()
const resultDiv = Math.floor(A / B).toString() // 몫만 출력한다.
const resultMod = (A % B).toString()

const resultArr = [resultSum, resultSub, resultMul, resultDiv, resultMod]

process.stdout.write(resultArr.join('\n'))
