import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
SArr = list(input().strip() for i in range(N))
testArr = list(input().strip() for i in range(M))

SSet = set(SArr)

result = 0
for word in testArr:
  result += 1 if word in SSet else 0

output(f"{result}")