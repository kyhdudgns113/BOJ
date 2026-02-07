import sys
from queue import PriorityQueue

input = sys.stdin.readline
output = sys.stdout.write

# 입력 파싱
V, E = map(int, input().split())
K = int(input())

# 본인과 연결된 정점들의 목록을 저장
connectListArr = [[] for _ in range(V + 1)]
for _ in range(E):
  U, V_, W = map(int, input().split())
  connectListArr[U].append((V_, W))

# 방문했는지 여부를 저장할 배열
isVisit = [False] * (V + 1)

# 정점까지 최단거리를 저장할 배열
# 초기에는 이론상 최대값을 넘는 V * 11(W 의 최대값)
INF = 11 * V
distArr = [INF] * (V + 1)
distArr[K] = 0

# 방문큐. 가장 거리가 짧은것부터 계산해야 하므로 우선순위큐로 한다.
# PriorityQueue는 (dist, now) 형태로 저장하면 dist 기준 최소 힙으로 동작
visitQueue = PriorityQueue()
visitQueue.put((0, K))

while not visitQueue.empty():
  dist, now = visitQueue.get()

  if isVisit[now]:
    continue

  isVisit[now] = True

  for nextNode, delta in connectListArr[now]:
    if distArr[nextNode] > dist + delta:
      distArr[nextNode] = dist + delta
      visitQueue.put((distArr[nextNode], nextNode))

# 출력
for i in range(1, V + 1):
  if distArr[i] == INF:
    output("INF\n")
  else:
    output(f"{distArr[i]}\n")
