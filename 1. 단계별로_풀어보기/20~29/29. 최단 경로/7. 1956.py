# PyPy3 으로 돌려야 한다.

import sys

input = sys.stdin.readline
output = sys.stdout.write

V, E = map(int, input().split())

distArr = list(list(10 ** 8 for i in range(V + 1)) for j in range(V + 1))

for _ in range(E):
  start, end, weight = map(int, input().split())
  distArr[start][end] = weight

for mid in range(1, V + 1):
  for start in range(1, V + 1):
    for end in range(1, V + 1):
      distArr[start][end] = min(distArr[start][end], distArr[start][mid] + distArr[mid][end])

result = 10 ** 8

for start in range(1, V + 1):
  for end in range(1, V + 1):
    result = min(result, distArr[start][end] + distArr[end][start])

if result < 10 ** 8:
  output(f"{result}")
else:
  output(f"-1")