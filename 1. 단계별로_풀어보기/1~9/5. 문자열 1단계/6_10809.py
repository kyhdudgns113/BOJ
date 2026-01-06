import sys

input = sys.stdin.readline
output = sys.stdout.write

S = input().strip()

resultArr = [-1] * 26

for idx, c in enumerate(S):
  nowIdx = ord(c) - ord('a')
  
  if resultArr[nowIdx] == -1:
    resultArr[nowIdx] = idx

for result in resultArr:
  output(f"{result} ")