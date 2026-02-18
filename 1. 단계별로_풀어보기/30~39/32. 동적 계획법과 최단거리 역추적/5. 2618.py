# Python 으로 돌려야만 한다.
# PyPY 로 돌리면 출력부분의 \n 때문에 컴파일 에러가 난다.

import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

def getDistance(axis0, axis1):
  return abs(axis1[0] - axis0[0]) + abs(axis1[1] - axis0[1])

N = int(input())
W = int(input())
workArr = list(list(map(int, input().split())) for i in range(W))

# resultArr[i][j]: 경찰차 마지막 위치쌍이 (i - 1, j - 1) 번째 사건일때 최소거리
resultArr = list(list(-1 for i in range(W + 1)) for j in range(W + 1))
prevArr = list(list([-1, -1] for i in range(W + 1)) for j in range(W + 1))

resultArr[0][0] = 0
resultArr[0][1] = getDistance([N, N], workArr[0])
resultArr[1][0] = getDistance([1, 1], workArr[0])

prevArr[0][1] = [0, 0]
prevArr[1][0] = [0, 0]


def getResult(i, j):
  global N
  if resultArr[i][j] != -1:
    return resultArr[i][j]

  resultArr[i][j] = 20000000

  # i 인 차가 이동했던 것일 경우
  if i > j:
    axis1 = workArr[i - 1]

    if i > j + 1:
      axis0 = workArr[i - 2]
      resultArr[i][j] = getResult(i - 1, j) + getDistance(axis0, axis1)
      prevArr[i][j] = [i - 1, j]
    else:
      for _i in range(j):
        axis0 = [1, 1]
        if _i > 0:
          axis0 = workArr[_i - 1]
        
        dist = getDistance(axis0, axis1)

        if resultArr[i][j] > getResult(_i, j) + dist:
          resultArr[i][j] = resultArr[_i][j] + dist
          prevArr[i][j] = [_i, j]

  # j 인 차가 이동했던 것일 경우
  elif i < j:
    axis1 = workArr[j - 1]

    if i + 1 < j:
      axis0 = workArr[j - 2]
      resultArr[i][j] = getResult(i, j - 1) + getDistance(axis0, axis1)
      prevArr[i][j] = [i, j - 1]
    else:
      for _j in range(i):
        axis0 = [N, N]
        if _j > 0:
          axis0 = workArr[_j - 1]
        
        dist = getDistance(axis0, axis1)

        if resultArr[i][j] > getResult(i, _j) + dist:
          resultArr[i][j] = resultArr[i][_j] + dist
          prevArr[i][j] = [i, _j]

  return resultArr[i][j]

# 최단거리와 그 떄의 i, j 를 구한다.
result = 20000000
nowI = -1
nowJ = -1
for k in range(W):
  if result > getResult(W, k):
    result = resultArr[W][k]
    nowI = W
    nowJ = k
  if result > getResult(k, W):
    result = resultArr[k][W]
    nowI = k
    nowJ = W

printArr = []

while nowI > -1:
  prevI, prevJ = prevArr[nowI][nowJ]
  
  if prevI == -1:
    break

  if nowI == prevI:
    printArr.append(2)
  else:
    printArr.append(1)
  
  nowI, nowJ = prevI, prevJ

printArr.reverse()

output(f"{result}\n")
output(f"{'\n'.join(str(n) for n in printArr)}")


