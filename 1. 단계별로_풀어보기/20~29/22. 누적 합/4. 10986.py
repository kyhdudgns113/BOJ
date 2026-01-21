import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
A = list(map(int, input().split()))

cntArr = [0] * M

prev = 0
cntArr[prev] = 1

for a in A:
  prev = (prev + a) % M
  cntArr[prev] += 1

result = sum(val * (val - 1) // 2 for val in cntArr)

output(f"{result}")