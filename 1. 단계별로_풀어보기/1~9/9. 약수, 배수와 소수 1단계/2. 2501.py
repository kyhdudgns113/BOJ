import math, sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())

maxIter = math.floor(math.sqrt(N))

factorArr = []

for i in range(1, maxIter + 1):
  if N % i == 0:
    factorArr.append(i)
    
    div = N // i
    if div != i:
      factorArr.append(div)

factorArr.sort()

if len(factorArr) < K:
  output(f"0")
else:
  output(f"{factorArr[K - 1]}")
