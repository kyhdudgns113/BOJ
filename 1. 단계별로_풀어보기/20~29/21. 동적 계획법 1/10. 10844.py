import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

resultArr = [[-1 for i in range(10)] for j in range(N + 1)]

for i in range(1, 10):
  resultArr[1][i] = 1
resultArr[1][0] = 0

def getResult(nowLen, nowNum):
  if resultArr[nowLen][nowNum] > -1:
    return resultArr[nowLen][nowNum]

  resultArr[nowLen][nowNum] = 0
  if nowNum > 0:
    resultArr[nowLen][nowNum] += getResult(nowLen - 1, nowNum - 1)
    resultArr[nowLen][nowNum] %= 1000000000

  if nowNum < 9:
    resultArr[nowLen][nowNum] += getResult(nowLen - 1, nowNum + 1)
    resultArr[nowLen][nowNum] %= 1000000000

  return resultArr[nowLen][nowNum]

output(f"{sum(getResult(N, i) for i in range(10)) % 1000000000}")