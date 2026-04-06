import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

#######################
#      입력 영역       #
#######################

N = int(input())
peopleArr = list(map(int, input().split()))
connInfoArr = list([] for i in range(N + 1))

for _ in range(N - 1):
  U, V = map(int, input().split())
  connInfoArr[U].append(V)
  connInfoArr[V].append(U)

###############################
#      기타 자료구조 영역       #
###############################

ROOT_NODE = 1
parentArr = list(-1 for i in range(N + 1))
parentArr[ROOT_NODE] = ROOT_NODE

#############################
#      사용할 함수 영역       #
#############################

def DFS(now):
  k0_arr = []
  k1_arr = []
  k2_arr = []

  for next in connInfoArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      k0, k1, k2 = DFS(next)
      k0_arr.append(k0)
      k1_arr.append(k1)
      k2_arr.append(k2)

  lenArr = len(k0_arr)

  # 영역 0: 현재 마을은 선정되는 경우. 자식은 전부 미선정.
  nowK0 = peopleArr[now - 1]
  for i in range(lenArr):
    nowK0 += max(k1_arr[i], k2_arr[i])

  # 영역 1: 현재 마을은 1연속 미선정, 부모 마을도 미선정 가능한 경우.
  # 자식 중 최소 1개는 선정되어야 함. 자식은 k0 또는 k1만 가능(k2 불가).
  nowK1 = 0
  hasK0 = False
  for i in range(lenArr):
    nowK1 += max(k0_arr[i], k1_arr[i])
    if k0_arr[i] >= k1_arr[i]:
      hasK0 = True
  if not hasK0 and lenArr > 0:
    maxDelta = max(k0_arr[i] - k1_arr[i] for i in range(lenArr))
    nowK1 += maxDelta

  # 영역 2: 현재 마을은 2연속 미선정, 부모 마을은 선정되어야 함.
  # 자식 중 최소 1개는 미선정(k1)이어야 함. 자식은 k0 또는 k1만 가능.
  nowK2 = 0
  isVisitK1 = False
  for i in range(lenArr):
    if k0_arr[i] < k1_arr[i]:
      isVisitK1 = True
    nowK2 += max(k0_arr[i], k1_arr[i])
  if not isVisitK1 and lenArr > 0:
    minValue = min(k0_arr[i] - k1_arr[i] for i in range(lenArr))
    nowK2 -= minValue

  return [nowK0, nowK1, nowK2]


#######################
#      출력 영역       #
#######################

k0, k1, k2 = DFS(ROOT_NODE)
output(f"{max(k0, k1, k2)}")

