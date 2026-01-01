import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

resultArr = [i + 1 for i in range(N)]

for m in range(M):
  i, j = map(int, input().split())
  resultArr[i - 1: j] = resultArr[i - 1:j][::-1]

output(" ".join(str(r) for r in resultArr))