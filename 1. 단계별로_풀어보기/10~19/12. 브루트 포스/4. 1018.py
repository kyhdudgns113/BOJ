import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
board = list(list(input().strip()) for i in range(N))

result = 64

for rowIdx in range(N - 7):
  for colIdx in range(M - 7):
    tempResult = 0

    for i in range(8):
      for j in range(8):
        base = 'W' if (i + j) % 2 == 0 else 'B'

        if board[rowIdx + i][colIdx + j] != base:
          tempResult += 1
    
    tempResult = min(tempResult, 64 - tempResult)

    result = min(result, tempResult)

output(f"{result}")