import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
board = [list(map(int, input().split())) for _ in range(N)]

isStart = [False] * N

result = 1000000000

def calculate():
  global result
  
  statStart = 0
  statLink = 0
  
  for i in range(N):
    for j in range(i + 1, N):
      if isStart[i] == isStart[j]:
        if isStart[i]:
          statStart += board[i][j] + board[j][i]
        else:
          statLink += board[i][j] + board[j][i]
  
  result = min(result, abs(statStart - statLink))

def recurse(humanIdx, numStart):
  remainStart = N // 2 - numStart
  
  if remainStart == 0:
    calculate()
    return
  
  for nHumanIdx in range(humanIdx + 1, N - remainStart + 1):
    isStart[nHumanIdx] = True
    recurse(nHumanIdx, numStart + 1)
    isStart[nHumanIdx] = False

for i in range(N):
  isStart[i] = True
  recurse(i, 1)
  isStart[i] = False

output(f"{result}")
