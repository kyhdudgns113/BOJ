import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
matrix = list(list(map(int, input().split())) for i in range(N))
queryArr = list(list(map(int, input().split())) for i in range(M))

sumArr = list(list(0 for i in range(N + 1)) for j in range(N + 1))

for row in range(1, N + 1):
  for col in range(1, N + 1):
    sumArr[row][col] = sumArr[row - 1][col] + sumArr[row][col - 1] - sumArr[row - 1][col - 1] + matrix[row - 1][col - 1]

for query in queryArr:
  row1, col1, row2, col2 = query

  result = sumArr[row2][col2] - sumArr[row1 - 1][col2] - sumArr[row2][col1 - 1] + sumArr[row1 - 1][col1 - 1]
  output(f"{result}\n")