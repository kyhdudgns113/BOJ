import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

# 글로벌 변수처럼 쓸 변수
accArr = None
cardArr = None
resultArr = None

def getResult(start, end):
  if resultArr[start][end] > 0:
    return resultArr[start][end]

  if start == end:
    resultArr[start][end] = cardArr[start]
    return cardArr[start]

  rangeSum = accArr[end + 1] - accArr[start]

  leftChoose = rangeSum - getResult(start + 1, end)
  rightChoose = rangeSum - getResult(start, end - 1)

  resultArr[start][end] = max(leftChoose, rightChoose)
  return resultArr[start][end]

for _ in range(T):
  N = int(input())
  cardArr = list(map(int, input().split()))
  
  accArr = list(0 for i in range(N + 1))
  for i in range(1, N + 1):
    accArr[i] = accArr[i - 1] + cardArr[i - 1]
  
  resultArr = list(list(0 for i in range(N + 1)) for j in range(N + 1))

  output(f"{getResult(0, N - 1)}\n")

