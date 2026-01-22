import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
distFrom = list(map(int, input().split()))
costArr = list(map(int, input().split()))

result = 0
accDist = 0
minCost = 1000000000

for i in range(N - 1):
  if costArr[i] < minCost:
    result += minCost * accDist
    minCost = costArr[i]
    accDist = distFrom[i]
  else:
    accDist += distFrom[i]

result += minCost * accDist

output(f"{result}")