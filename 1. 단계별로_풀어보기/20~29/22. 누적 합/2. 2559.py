import sys

input = sys.stdin.readline
output = sys.stdout.write

[N, K] = map(int, input().split())
numArr = list(map(int, input().split()))
sumArr = list(0 for i in range(N + 1))

for i in range(1, N + 1):
  sumArr[i] = sumArr[i - 1] + numArr[i - 1]

result = max(sumArr[i + K] - sumArr[i] for i in range(N - K + 1))

output(f"{result}")