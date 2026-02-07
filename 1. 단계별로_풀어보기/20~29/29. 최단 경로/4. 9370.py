from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

for _ in range(T):
  n, m, t = map(int, input().split())
  s, g, h = map(int, input().split())
  abdArr = list(list(map(int, input().split())) for i in range(m))
  xArr = list(int(input()) for i in range(t))

  connectListArr = list([] for i in range(n + 1))

  for a, b, d in abdArr:
    connectListArr[a].append([b, d])
    connectListArr[b].append([a, d])

  isVisitGH = [False] * (n + 1)
  distArr = [3000000] * (n + 1)

  visitQueue = PriorityQueue()
  distArr[s] = 0
  visitQueue.put([s, 0, False])

  while not visitQueue.empty():
    now, dist, isVisit = visitQueue.get()

    if distArr[now] < dist:
      continue

    if distArr[now] == dist and not isVisit and isVisitGH[now]:
      continue

    for next, delta in connectListArr[now]:
      newDist = dist + delta
      newVisit = True if isVisit or now == g and next == h or now == h and next == g else False

      if distArr[next] > newDist or distArr[next] == newDist and not isVisitGH[next] and newVisit:
        distArr[next] = newDist
        isVisitGH[next] = newVisit
        visitQueue.put([next, newDist, newVisit])

  resultArr = list(x for x in xArr if isVisitGH[x])
  resultArr.sort()
  output(f"{' '.join(str(x) for x in resultArr)}\n")