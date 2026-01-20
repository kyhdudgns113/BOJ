import sys

input = sys.stdin.readline
output = sys.stdout.write

w = list(list(list(False for i in range(21)) for j in range(21)) for k in range(21))

def getW(a, b, c):
  if a <= 0 or b <= 0 or c <= 0:
    return 1

  if a > 20 or b > 20 or c > 20:
    return getW(20, 20, 20)

  if w[a][b][c] != False:
    return w[a][b][c]

  if a < b < c:
    w[a][b][c] = getW(a, b, c - 1) + getW(a, b - 1, c - 1) - getW(a, b - 1, c)
    return w[a][b][c]
  
  w[a][b][c] = getW(a - 1, b, c) + getW(a - 1, b - 1, c) + getW(a - 1, b, c - 1) - getW(a - 1, b - 1, c - 1)
  return w[a][b][c]

while True:
  a, b, c = map(int, input().split())

  if a == -1 and b == -1 and c == -1:
    break

  output(f"w({a}, {b}, {c}) = {getW(a, b, c)}\n")
