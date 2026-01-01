/**
 * 1-3. 1001. A-B
 *
 * 입력
 *   A, B : 10 이하의 자연수
 *
 * 출력
 *   A - B
 */

const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split(' ')
let [a, b] = input

a = parseInt(a)
b = parseInt(b)

console.log(a - b)
