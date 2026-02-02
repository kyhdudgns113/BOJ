from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

board = list(list(map(int, list(input().strip()))) for i in range(N))

isVisit = list(list(False for i in range(N)) for j in range(N))

resultArr = []
visitQueue = deque()

def bfs(row, col):
  global N
  result = 1
  if row > 0 and board[row - 1][col] == 1 and not isVisit[row - 1][col]:
    isVisit[row - 1][col] = True
    visitQueue.append([row - 1, col])
  if row < N - 1 and board[row + 1][col] == 1 and not isVisit[row + 1][col]:
    isVisit[row + 1][col] = True
    visitQueue.append([row + 1, col]) 
  if col > 0 and board[row][col - 1] == 1 and not isVisit[row][col - 1]:
    isVisit[row][col - 1] = True
    visitQueue.append([row, col - 1])
  if col < N - 1 and board[row][col + 1] == 1 and not isVisit[row][col + 1]:
    isVisit[row][col + 1] = True
    visitQueue.append([row, col + 1])

  if len(visitQueue) > 0:
    nextRow, nextCol = visitQueue.popleft()
    result += bfs(nextRow, nextCol)

  return result

for row in range(N):
  for col in range(N):
    if board[row][col] == 1 and not isVisit[row][col]:
      isVisit[row][col] = True
      result = bfs(row, col)
      resultArr.append(result)

resultArr.sort()

output(f"{len(resultArr)}\n")
for result in resultArr:
  output(f"{result}\n")