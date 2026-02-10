import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

M, N = map(int, input().split())
mapMatrix = list(list(map(int, input().split())) for i in range(M))

resultMatrix = list(list(-1 for i in range(N)) for j in range(M))
resultMatrix[0][0] = 1

def getResult(row, col):
  if resultMatrix[row][col] != -1:
    return resultMatrix[row][col]

  resultMatrix[row][col] = 0

  nowHeight = mapMatrix[row][col]

  if row > 0 and nowHeight < mapMatrix[row - 1][col]:
    resultMatrix[row][col] += getResult(row - 1, col)
  if row < M - 1 and nowHeight < mapMatrix[row + 1][col]:
    resultMatrix[row][col] += getResult(row + 1, col)
  
  if col > 0 and nowHeight < mapMatrix[row][col - 1]:
    resultMatrix[row][col] += getResult(row, col - 1)
  if col < N - 1 and nowHeight < mapMatrix[row][col + 1]:
    resultMatrix[row][col] += getResult(row, col + 1)

  return resultMatrix[row][col]

output(f"{getResult(M - 1, N - 1)}")