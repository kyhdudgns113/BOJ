import sys
from queue import PriorityQueue

input = sys.stdin.readline
output = sys.stdout.write

def dijkstra(start, end):
  if start == end:
    return 0
  minDist = [10000000] * (N + 1)
  isVisit = [False] * (N + 1)
  visitQueue = PriorityQueue()

  minDist[start] = 0
  visitQueue.put((0, start))

  while not visitQueue.empty():
    dist, now = visitQueue.get()

    if isVisit[now]:
      continue

    isVisit[now] = True

    for connInfo in connectListArr[now]:
      next, delta = connInfo

      if minDist[next] > dist + delta:
        minDist[next] = dist + delta
        visitQueue.put((minDist[next], next))

  return minDist[end]

# 입력 파싱
N, E = map(int, input().split())
ABCArr = [list(map(int, input().split())) for _ in range(E)]
V1, V2 = map(int, input().split())

# 간선 정보 저장하는 배열
connectListArr = [[] for _ in range(N + 1)]
for ABC in ABCArr:
  A, B, C = ABC
  connectListArr[A].append([B, C])
  connectListArr[B].append([A, C])

# 다익스트라로 필요한 거리들 계산
dist1ToV1 = dijkstra(1, V1)
dist1ToV2 = dijkstra(1, V2)
distV1ToV2 = dijkstra(V1, V2)
distV1ToN = dijkstra(V1, N)
distV2ToN = dijkstra(V2, N)

# 두 가지 경로 계산
# 경로1: 1 → v1 → v2 → N
path1 = dist1ToV1 + distV1ToV2 + distV2ToN
# 경로2: 1 → v2 → v1 → N
path2 = dist1ToV2 + distV1ToV2 + distV1ToN

INF = 10000000
result = min(path1, path2)

if result >= INF:
  output("-1")
else:
  output(f"{result}")
