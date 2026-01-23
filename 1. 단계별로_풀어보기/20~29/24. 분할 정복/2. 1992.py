import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
board = list(list(input().strip()) for i in range(N))

def getString(rowStart, colStart, rowOver, colOver):
  if rowOver - rowStart == 1:
    return f"{board[rowStart][colStart]}"

  rowHalf = (rowOver + rowStart) // 2
  colHalf = (colOver + colStart) // 2

  part00 = getString(rowStart, colStart, rowHalf, colHalf)
  part01 = getString(rowStart, colHalf, rowHalf, colOver)
  part10 = getString(rowHalf, colStart, rowOver, colHalf)
  part11 = getString(rowHalf, colHalf, rowOver, colOver)

  if len(part00) == 1 and part00 == part01 == part10 == part11:
    return part00

  return '(' + part00 + part01 + part10 + part11 + ')'

output(getString(0, 0, N, N))

