# PyPy3 으로 돌려야 100점이 나온다.

import sys

input = sys.stdin.readline
output = sys.stdout.write

S = list(input().strip())
Q = int(input())
queryArr = list(input().strip().split() for i in range(Q))

lenS = len(S) # 중복연산 방지
a = ord('a')

sumArr = list(list(0 for i in range(lenS + 1)) for j in range(26))

firstC = queryArr[0][0]
sumArr[ord(firstC) - a][0] = 1

for s in range(1, lenS + 1):
  for cIdx in range(26):
    sumArr[cIdx][s] = sumArr[cIdx][s - 1]
  
  c = S[s - 1]
  sumArr[ord(c) - a][s] += 1

for query in queryArr:
  c, i, j, = query
  i = int(i)
  j = int(j)

  queryResult = sumArr[ord(c) - a][j + 1] - sumArr[ord(c) - a][i]
  output(f"{queryResult}\n")