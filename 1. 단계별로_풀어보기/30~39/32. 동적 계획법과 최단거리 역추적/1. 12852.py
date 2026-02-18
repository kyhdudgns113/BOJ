import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

resultArr = list(-1 for i in range(N + 1))
prevArr = list(1 for i in range(N + 1))

resultArr[1] = 0

def getResult(now):
  if resultArr[now] != -1:
    return resultArr[now]

  resultArr[now] = 1000000

  if now % 2 == 0 and resultArr[now] > getResult(now // 2) + 1:
    resultArr[now] = resultArr[now // 2] + 1
    prevArr[now] = now // 2

  if now % 3 == 0 and resultArr[now] > getResult(now // 3) + 1:
    resultArr[now] = resultArr[now // 3] + 1
    prevArr[now] = now // 3

  # 이걸 맨 마지막으로 안하면 호출스택이 100만개까지 쌓이게 된다.
  if resultArr[now] > getResult(now - 1) + 1:
    resultArr[now] = resultArr[now - 1] + 1
    prevArr[now] = now - 1

  return resultArr[now]

output(f"{getResult(N)}\n")

now = N
while True:
  output(f"{now} ")

  if now == prevArr[now]:
    break

  now = prevArr[now]
