// 입력
const fs = require('fs')
const inputs = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 출력할 문자열, 출력함수 자주 쓰면 오래걸려서 미리 이거 쓰는 훈련
let result = ''

inputs.forEach(strs => (result += strs + '\n'))

process.stdout.write(result)
