# pypy 로 해야 돌아간다
# python 으로 하면 시간초과

import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

isVisit = [[0] * N for _ in range(N)]

result = 0

def recurse(nowRow, nowCol):
  global result
  
  if nowRow == N - 1:
    result += 1
    return
  
  for deltaRow in range(1, N - nowRow):
    if nowCol - deltaRow >= 0:
      isVisit[nowRow + deltaRow][nowCol - deltaRow] += 1
    
    if nowCol + deltaRow < N:
      isVisit[nowRow + deltaRow][nowCol + deltaRow] += 1
    
    isVisit[nowRow + deltaRow][nowCol] += 1
  
  nextRow = nowRow + 1
  
  for nextCol in range(N):
    if isVisit[nextRow][nextCol] == 0:
      isVisit[nextRow][nextCol] = 1
      recurse(nextRow, nextCol)
      isVisit[nextRow][nextCol] = 0
  
  for deltaRow in range(1, N - nowRow):
    if nowCol - deltaRow >= 0:
      isVisit[nowRow + deltaRow][nowCol - deltaRow] -= 1
    
    if nowCol + deltaRow < N:
      isVisit[nowRow + deltaRow][nowCol + deltaRow] -= 1
    
    isVisit[nowRow + deltaRow][nowCol] -= 1

for col in range(N):
  recurse(0, col)

output(f"{result}")
