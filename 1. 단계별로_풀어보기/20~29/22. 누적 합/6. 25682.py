# PyPy3 으로 돌려야 시간초과가 안난다

import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M, K = map(int, input().split())
board = list(list(input().strip()) for i in range(N))

# Pythonic 하게 만들어봤다. 근데 가독성이 좀...
okArr = list(list(1 if (i + j) % 2 == 0 and board[i][j] == 'B' or (i + j) % 2 == 1 and board[i][j] == 'W' else 0 for j in range(M)) for i in range(N))


sumArr = list(list(0 for i in range(M + 1)) for j in range(N + 1))

for row in range(1, N + 1):
  for col in range(1, M + 1):
    sumArr[row][col] = okArr[row - 1][col - 1] + sumArr[row - 1][col] + sumArr[row][col - 1] - sumArr[row - 1][col - 1]


# Pythonic 하게 구하려면 코드가 너무 길어진다.
result = K * K
for row in range(K, N + 1):
  for col in range(K, M + 1):
    nowSum = sumArr[row][col] - sumArr[row - K][col] - sumArr[row][col - K] + sumArr[row - K][col - K]
    result = min(result, nowSum, K * K - nowSum)

output(f"{result}")



