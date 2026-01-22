import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())
coinArr = list(int(input()) for i in range(N))

coinArr.reverse()
result = 0

for coin in coinArr:
  div = K // coin
  result += div
  K -= div * coin

output(f"{result}")