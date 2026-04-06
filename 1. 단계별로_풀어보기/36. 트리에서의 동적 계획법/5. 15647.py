import sys
from array import array
from collections import deque

input = sys.stdin.readline
output = sys.stdout.write

# 입력 저장
N = int(input())
connInfo = [[] for _ in range(N + 1)]

for _ in range(N - 1):
  u, v, w = map(int, input().split())
  connInfo[u].append((v, w))
  connInfo[v].append((u, w))

# array 모듈로 메모리 절약 (C 스타일 정수)
nowSum = array('q', [0] * (N + 1))
numNode = array('q', [0] * (N + 1))
parentArr = array('q', [-1] * (N + 1))
resultArr = array('q', [0] * (N + 1))

rootNode = 1
parentArr[rootNode] = 0

# BFS로 부모·자식 관계 구축
children = [[] for _ in range(N + 1)]
visitQueue = deque([rootNode])
while visitQueue:
  now = visitQueue.popleft()
  for nextNode, dist in connInfo[now]:
    if parentArr[nextNode] == -1:
      parentArr[nextNode] = now
      children[now].append((nextNode, dist))
      visitQueue.append(nextNode)

# 역순 레벨 순서 (리프 → 루트)
order = []
visitQueue.append(rootNode)
while visitQueue:
  now = visitQueue.popleft()
  order.append(now)
  for nextNode, _ in children[now]:
    visitQueue.append(nextNode)

# dfs_1: 리프부터 처리
for now in reversed(order):
  nowSumVal = 0
  nowNodes = 1
  for nextNode, dist in children[now]:
    nowSumVal += nowSum[nextNode] + dist * numNode[nextNode]
    nowNodes += numNode[nextNode]
  nowSum[now] = nowSumVal
  numNode[now] = nowNodes

# dfs_2: 루트부터 처리
visitQueue.append((rootNode, 0, 0, 0, 0))
while visitQueue:
  now, argSumNow, argSumAcc, argSumLen, distParent = visitQueue.popleft()
  resultArr[now] = nowSum[now] + argSumNow + argSumAcc + argSumLen * distParent

  sumNow = argSumNow
  sumAcc = argSumAcc
  sumLen = argSumLen + 1
  for nextNode, dist in children[now]:
    sumNow += nowSum[nextNode]
    sumAcc += numNode[nextNode] * dist
    sumLen += numNode[nextNode]
  sumAcc += argSumLen * distParent

  for nextNode, dist in children[now]:
    nextSumNow = sumNow - nowSum[nextNode]
    nextSumAcc = sumAcc - numNode[nextNode] * dist
    nextSumLen = sumLen - numNode[nextNode]
    visitQueue.append((nextNode, nextSumNow, nextSumAcc, nextSumLen, dist))

for i in range(1, N + 1):
  output(str(resultArr[i]) + '\n')