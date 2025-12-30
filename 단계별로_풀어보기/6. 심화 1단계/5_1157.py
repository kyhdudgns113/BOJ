import sys

input = sys.stdin.readline
output = sys.stdout.write

S = list(input().strip().upper())

cntArr = [0] * 26

# 등장횟수 카운팅
for c in S:
  charIdx = ord(c) - ord('A')
  cntArr[charIdx] += 1

maxCnt = 0
result = ''

for i in range(26):
  if maxCnt < cntArr[i]:
    maxCnt = cntArr[i]
    result = chr(i + ord('A'))
  elif maxCnt == cntArr[i]:
    result = '?'

output(result)