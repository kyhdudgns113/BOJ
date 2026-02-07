import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
M = int(input())
busInfoArr = list(list(map(int, input().split())) for i in range(M))

resultMatrix = list(list(10 ** 8 for i in range(N + 1)) for j in range(N + 1))

for start, end, cost in busInfoArr:
  resultMatrix[start][end] = min(resultMatrix[start][end], cost)

for i in range(N + 1):
  resultMatrix[i][i] = 0

for mid in range(1, N + 1):
  for start in range(1, N + 1):
    for end in range(1, N + 1):
      resultMatrix[start][end] = min(resultMatrix[start][end], resultMatrix[start][mid] + resultMatrix[mid][end])

for row in resultMatrix[1::]:
  output(f"{' '.join(str(result) if result < 10**8 else '0' for result in row[1::])}\n")

