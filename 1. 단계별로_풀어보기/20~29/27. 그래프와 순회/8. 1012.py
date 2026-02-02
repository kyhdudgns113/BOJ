from collections import deque
import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

# bfs 함수 내에서 global 로 쓰기 위해 미리 선언
N = 1
M = 1
K = 1

farm = []
isVisit = []

visitQueue = deque()

def bfs(row, col):
  global N, M
  
  if row > 0 and farm[row - 1][col] == 1 and not isVisit[row - 1][col]:
    isVisit[row - 1][col] = True
    visitQueue.append([row - 1, col])
  if row < N - 1 and farm[row + 1][col] == 1 and not isVisit[row + 1][col]:
    isVisit[row + 1][col] = True
    visitQueue.append([row + 1, col])
  if col > 0 and farm[row][col - 1] == 1 and not isVisit[row][col - 1]:
    isVisit[row][col - 1] = True
    visitQueue.append([row, col - 1])
  if col < M - 1 and farm[row][col + 1] == 1 and not isVisit[row][col + 1]:
    isVisit[row][col + 1] = True
    visitQueue.append([row, col + 1])

  if len(visitQueue) > 0:
    nextRow, nextCol = visitQueue.popleft()
    bfs(nextRow, nextCol)

while T > 0:
  m, n, k = map(int, input().split())

  N = n
  M = m
  K = k

  farm = list(list(0 for i in range(M)) for j in range(N))
  isVisit = list(list(False for i in range(M)) for j in range(N))

  for i in range(K):
    x, y = map(int, input().split())
    farm[y][x] = 1

  result = 0

  for row in range(N):
    for col in range(M):
      if farm[row][col] == 1 and not isVisit[row][col]:
        isVisit[row][col] = True
        bfs(row, col)
        result += 1

  output(f"{result}\n")

  T -= 1

