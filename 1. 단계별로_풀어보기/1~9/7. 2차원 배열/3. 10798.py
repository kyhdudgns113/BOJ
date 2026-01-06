import sys

input = sys.stdin.readline
output = sys.stdout.write

M = list(list(input().strip()) for i in range(5))

resultArr = [['' for i in range(5)] for j in range(15)]

for rowIdx in range(5):
  for colIdx, c in enumerate(M[rowIdx]):
    resultArr[colIdx][rowIdx] = c

for row in resultArr:
  output(f"{''.join(row)}")
