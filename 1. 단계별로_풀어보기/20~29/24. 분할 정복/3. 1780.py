import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
paper = list(list(map(int, input().split())) for i in range(N))

numPaper = [0, 0, 0, 0]

def getPaper(rowStart, colStart, rowOver, colOver):
  if rowOver - rowStart == 1:
    return paper[rowStart][colStart] + 1

  div = (rowOver - rowStart) // 3

  paperArr = [0] * 9
  isSame = True

  for i in range(3):
    for j in range(3):
      newRow = rowStart + i * div
      newCol = colStart + j * div
      paperArr[3 * i + j] = getPaper(newRow, newCol, newRow + div, newCol + div)

  for i in range(1, 9):
    if paperArr[i] == 3 or paperArr[i] != paperArr[i - 1]:
      isSame = False
      break

  if not isSame:
    for p in paperArr:
      numPaper[p] += 1
    return 3

  return paperArr[0]

numPaper[getPaper(0, 0, N, N)] += 1

output(f"{numPaper[0]}\n{numPaper[1]}\n{numPaper[2]}")
