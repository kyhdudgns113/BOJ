import sys

sys.setrecursionlimit(500000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
triangle = list(list(map(int, input().split())) for i in range(N))

resultArr = list([-1 for i in range(N)] for j in range(N))

def getResult(row, col):
  if row + col == 0:
    resultArr[row][col] = triangle[row][col]
    return resultArr[row][col]

  if resultArr[row][col] != -1:
    return resultArr[row][col]

  resultArr[row][col] = 0

  if col > 0:
    resultArr[row][col] = max(resultArr[row][col], getResult(row - 1, col - 1))

  if row > col:
    resultArr[row][col] = max(resultArr[row][col], getResult(row - 1, col))

  resultArr[row][col] += triangle[row][col]
  return resultArr[row][col]

output(f"{max(getResult(N - 1, col) for col in range(N))}")