import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
numArr = list(map(int, input().split()))

sumArr = list(0 for i in range(N + 1))
for i in range(1, N + 1):
  sumArr[i] = sumArr[i - 1] + numArr[i - 1]

for _ in range(M):
  i, j = map(int, input().split())
  output(f"{sumArr[j] - sumArr[i - 1]}\n")
  