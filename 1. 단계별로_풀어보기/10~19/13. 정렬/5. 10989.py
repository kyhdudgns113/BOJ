import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

visitCntArr = [0] * 10001

for i in range(N):
  num = int(input())
  visitCntArr[num] += 1

for i in range(1, 10001):
  for j in range(visitCntArr[i]):
    output(f"{i}\n")