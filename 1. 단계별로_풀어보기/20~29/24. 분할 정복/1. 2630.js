// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const paper = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 상수 선언
const isNULL = 2
const isWhite = 0
const isBlue = 1

// 종이 갯수 변수
let numPaper = [0, 0, 0]

function getPaperColor(rowStart, colStart, rowOver, colOver) {
  if (rowOver - rowStart === 1) {
    return paper[rowStart][colStart]
  }

  const rowHalf = Math.floor((rowOver - rowStart) / 2) + rowStart
  const colHalf = Math.floor((colOver - colStart) / 2) + colStart

  // 4분면을 기준으로 나눈다.
  const paper1 = getPaperColor(rowStart, colHalf, rowHalf, colOver)
  const paper2 = getPaperColor(rowStart, colStart, rowHalf, colHalf)
  const paper3 = getPaperColor(rowHalf, colStart, rowOver, colHalf)
  const paper4 = getPaperColor(rowHalf, colHalf, rowOver, colOver)

  // 4개가 모두 흰색이거나 파란색이면 그대로 리턴한다.
  if (paper1 !== isNULL && paper1 === paper2 && paper2 === paper3 && paper3 === paper4) {
    return paper1
  }

  // 그게 아닌 경우는 각각의 경우를 1씩 늘린다.
  numPaper[paper1]++
  numPaper[paper2]++
  numPaper[paper3]++
  numPaper[paper4]++

  return isNULL
}

const firstPaper = getPaperColor(0, 0, N, N)

numPaper[firstPaper]++

process.stdout.write(`${numPaper[isWhite]}\n${numPaper[isBlue]}`)
