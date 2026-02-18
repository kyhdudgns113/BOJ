from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

# DSLR 연산 결과 미리 계산 (0~9999)
preD = [(2 * i) % 10000 for i in range(10000)]
preS = [(i + 9999) % 10000 for i in range(10000)]
preL = [(10 * i + i // 1000) % 10000 for i in range(10000)]
preR = [(i // 10 + 1000 * (i % 10)) for i in range(10000)]

preOps = [(preD, 'D'), (preS, 'S'), (preL, 'L'), (preR, 'R')]

resultArr = [20000] * 10001
prevNum = [-1] * 10001
prevOp = ['X'] * 10001


for _ in range(T):
  A, B = map(int, input().split())

  for i in range(10001):
    resultArr[i] = 20000
    prevNum[i] = -1
    prevOp[i] = 'X'

  # Bottom-Up BFS: A에서 B까지
  visitQueue = deque()
  visitQueue.append(A)
  resultArr[A] = 0

  while visitQueue:
    now = visitQueue.popleft()

    if now == B:
      break

    nowRes = resultArr[now]

    for pre, opChar in preOps:
      nextVal = pre[now]
      if resultArr[nextVal] > nowRes + 1:
        resultArr[nextVal] = nowRes + 1
        prevNum[nextVal] = now
        prevOp[nextVal] = opChar
        visitQueue.append(nextVal)

  printArr = deque()
  now = B
  while now != A:
    printArr.appendleft(prevOp[now])
    now = prevNum[now]

  output("".join(printArr) + "\n")