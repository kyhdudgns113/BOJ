import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

#######################
#      입력 영역       #
#######################

N = int(input())
WArr = list(map(int, input().split()))
connInfoArr = list([] for _ in range(N + 1))
for _ in range(N - 1):
  u, v = map(int, input().split())
  connInfoArr[u].append(v)
  connInfoArr[v].append(u)

###############################
#      기타 자료구조 영역       #
###############################

parentArr = list(-1 for _ in range(N + 1))

#############################
#      사용할 함수 영역       #
#############################


def DFS(now):
  k0Map = {}
  k1Map = {}
  k2Map = {}

  for next in connInfoArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      k0, k1, k2 = DFS(next)
      k0Map[next] = k0
      k1Map[next] = k1
      k2Map[next] = k2

  nowK0Val = WArr[now - 1]
  nowK1Val = 0
  nowK2Val = 0

  nowK0ArrMap = {}
  nowK1ArrMap = {}
  nowK2ArrMap = {}

  hasK0 = False

  for child in k0Map:
    k0Val = k0Map[child][0]
    k1Val = k1Map[child][0]
    k2Val = k2Map[child][0]

    k0Arr = k0Map[child][1]
    k1Arr = k1Map[child][1]
    k2Arr = k2Map[child][1]

    if k1Val > k2Val:
      nowK0ArrMap[child] = k1Arr
    else:
      nowK0ArrMap[child] = k2Arr

    if k0Val >= k1Val:
      hasK0 = True
      nowK1ArrMap[child] = k0Arr
    else:
      nowK1ArrMap[child] = k1Arr

    if k1Val >= k2Val:
      nowK2ArrMap[child] = k1Arr
    else:
      nowK2ArrMap[child] = k2Arr

    nowK0Val += max(k1Map[child][0], k2Map[child][0])
    nowK1Val += max(k0Map[child][0], k1Map[child][0])
    nowK2Val += max(k1Map[child][0], k2Map[child][0])

  if not hasK0 and len(k0Map) > 0:
    maxDelta = -200000000
    whichChild = -1

    for child in k1Map:
      k0Val = k0Map[child][0]
      k1Val = k1Map[child][0]

      if maxDelta < k0Val - k1Val:
        maxDelta = k0Val - k1Val
        whichChild = child

    nowK1Val += maxDelta
    nowK1ArrMap[whichChild] = k0Map[whichChild][1]

  nowK0 = [nowK0Val, [now] + [x for arr in nowK0ArrMap.values() for x in arr]]
  nowK1 = [nowK1Val, [x for arr in nowK1ArrMap.values() for x in arr]]
  nowK2 = [nowK2Val, [x for arr in nowK2ArrMap.values() for x in arr]]

  return [nowK0, nowK1, nowK2]


#######################
#      출력 영역       #
#######################

ROOT_NODE = 1
parentArr[ROOT_NODE] = 0

k0, k1, k2 = DFS(ROOT_NODE)

if k1[0] <= k0[0] and k2[0] <= k0[0]:
  k0[1].sort()
  output(f"{k0[0]}\n")
  output(f"{' '.join(map(str, k0[1]))}\n")
elif k0[0] <= k1[0] and k2[0] <= k1[0]:
  k1[1].sort()
  output(f"{k1[0]}\n")
  output(f"{' '.join(map(str, k1[1]))}\n")
else:
  k2[1].sort()
  output(f"{k2[0]}\n")
  output(f"{' '.join(map(str, k2[1]))}\n")
