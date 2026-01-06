import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
axisArr = list(list(map(int, input().split())) for i in range(N))

whiteArea = list(list(0 for i in range(100)) for j in range(100))

for axis in axisArr:
  X, Y = axis

  maxX = min(100, X + 10)
  maxY = min(100, Y + 10)

  for x in range(X, maxX):
    for y in range(Y, maxY):
      whiteArea[x][y] = 1

output(f"{sum(sum(row) for row in whiteArea)}")