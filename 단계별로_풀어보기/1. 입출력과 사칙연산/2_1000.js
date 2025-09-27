/**
 * 1-2. 1000. A+B
 *
 * 두 수를 더한 값을 출력하는 문제이다.
 *
 * Node 로 코딩 테스트를 하는 상황을 대비하기 위해 연습겸 풀어봤다.
 */

const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split(' ')
const a = parseInt(input[0])
const b = parseInt(input[1])

process.stdout.write((a + b).toString())
