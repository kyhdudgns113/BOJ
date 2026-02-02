from collections import deque
import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().strip().split())

maze = list(list(map(int, list(input().strip()))) for i in range(N))

isVisit = list(list(0 for i in range(M)) for j in range(N))

visitQueue = deque()

def bfs(row, col):
  global N, M
  if row > 0 and maze[row - 1][col] > 0 and isVisit[row - 1][col] == 0:
    isVisit[row - 1][col] = isVisit[row][col] + 1
    visitQueue.append([row - 1, col])
  if row < N - 1 and maze[row + 1][col] > 0 and isVisit[row + 1][col] == 0:
    isVisit[row + 1][col] = isVisit[row][col] + 1
    visitQueue.append([row + 1, col])
  if col > 0 and maze[row][col - 1] > 0 and isVisit[row][col - 1] == 0:
    isVisit[row][col - 1] = isVisit[row][col] + 1
    visitQueue.append([row, col - 1])
  if col < M - 1 and maze[row][col + 1] > 0 and isVisit[row][col + 1] == 0:
    isVisit[row][col + 1] = isVisit[row][col] + 1
    visitQueue.append([row, col + 1])

  if len(visitQueue) > 0:
    nextRow, nextCol = visitQueue.popleft()
    bfs(nextRow, nextCol)

isVisit[0][0] = 1
bfs(0, 0)

output(f"{isVisit[N - 1][M - 1]}\n")
