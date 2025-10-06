import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

basketArr = [0 for i in range(N)]

for idx in range(M):
  i, j, k = map(int, input().split())

  basketArr[i:j + 1] = [k] * (j - i + 1)

output(f"{" ".join(str(basketArr[i]) for i in range(N))}")