// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [A, B, C, D, E, F] = inputArr[0].split(' ').map(Number)

for (let x = -999; x <= 999; x++) {
  for (let y = -999; y <= 999; y++) {
    const eq0 = A * x + B * y === C
    const eq1 = D * x + E * y === F

    if (eq0 && eq1) {
      process.stdout.write(`${x} ${y}`)
      return
    }
  }
}
