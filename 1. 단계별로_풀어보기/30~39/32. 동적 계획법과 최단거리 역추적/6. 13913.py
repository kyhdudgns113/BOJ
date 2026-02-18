from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())

resultArr = [200001 for i in range(200001)] 
prevArr = [-1 for i in range(200001)]

visitQueue = deque()

resultArr[N] = 0
visitQueue.append(N)


while visitQueue:
  now = visitQueue.popleft()
  nowRes = resultArr[now]

  if now > 0 and resultArr[now - 1] > nowRes + 1:
    resultArr[now - 1] = nowRes + 1
    prevArr[now - 1] = now
    visitQueue.append(now - 1)

  if now < 200000 and resultArr[now + 1] > nowRes + 1:
    resultArr[now + 1] = nowRes + 1
    prevArr[now + 1] = now
    visitQueue.append(now + 1)

  if now < 100000 and resultArr[2 * now] > nowRes + 1:
    resultArr[2 * now] = nowRes + 1
    prevArr[2 * now] = now
    visitQueue.append(2 * now)

printDeque = deque()

now = K

while now > -1:
  printDeque.appendleft(now)
  now = prevArr[now]

output(f"{len(printDeque) - 1}\n")
output(f"{' '.join(str(num) for num in printDeque)}")