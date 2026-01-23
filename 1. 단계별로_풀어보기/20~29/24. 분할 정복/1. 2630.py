import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
paper = list(list(map(int, input().split())) for i in range(N))

numPaper = [0, 0, 0]

def getPaperColor(rowStart, colStart, rowOver, colOver):
  if rowOver - rowStart == 1:
    return paper[rowStart][colStart]

  rowHalf = (rowOver - rowStart) // 2 + rowStart
  colHalf = (colOver - colStart) // 2 + colStart

  paper1 = getPaperColor(rowStart, colHalf, rowHalf, colOver)
  paper2 = getPaperColor(rowStart, colStart, rowHalf, colHalf)
  paper3 = getPaperColor(rowHalf, colStart, rowOver, colHalf)
  paper4 = getPaperColor(rowHalf, colHalf, rowOver, colOver)

  if paper1 != 2 and paper1 == paper2 == paper3 == paper4:
    return paper1

  numPaper[paper1] += 1
  numPaper[paper2] += 1
  numPaper[paper3] += 1
  numPaper[paper4] += 1

  return 2

initPaper = getPaperColor(0, 0, N, N)
numPaper[initPaper] += 1

output(f"{numPaper[0]}\n{numPaper[1]}")