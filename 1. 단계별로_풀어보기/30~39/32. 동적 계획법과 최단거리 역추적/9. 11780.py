import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
M = int(input())
busInfoArr = list(list(map(int, input().split())) for i in range(M))

resultArr = [[10000001] * (N + 1) for _ in range(N + 1)]
medianArr = [[-1] * (N + 1) for _ in range(N + 1)]

def getMedianArr(start, end):
  if start == end or resultArr[start][end] > 10000000:
    return [0]

  median = medianArr[start][end]

  if median == start or median == end:
    return [start, end]
  else:
    return getMedianArr(start, median) + getMedianArr(median, end)[1:]

for busInfo in busInfoArr:
  start, end, cost = busInfo[0], busInfo[1], busInfo[2]
  resultArr[start][end] = min(resultArr[start][end], cost)
  medianArr[start][end] = start

for i in range(1, N + 1):
  resultArr[i][i] = 0
  medianArr[i][i] = i

for median in range(1, N + 1):
  for start in range(1, N + 1):
    for end in range(1, N + 1):
      if resultArr[start][end] > resultArr[start][median] + resultArr[median][end]:
        resultArr[start][end] = resultArr[start][median] + resultArr[median][end]
        medianArr[start][end] = median

for i in range(1, N + 1):
  line = " ".join(str(0 if resultArr[i][j] > 10000000 else resultArr[i][j]) for j in range(1, N + 1))
  output(f"{line}\n")



for i in range(1, N + 1):
  for j in range(1, N + 1):
    getArr = getMedianArr(i, j)
    tempList = []
    for k in range(len(getArr)):
      if k == 0 or getArr[k] != getArr[k - 1]:
        tempList.append(getArr[k])
    len_ = len(tempList)
    if len_ == 1:
      output("0\n")
    else:
      output(f"{len_} {' '.join(map(str, tempList))}\n")
