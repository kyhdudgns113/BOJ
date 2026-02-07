import sys
from collections import deque

input = sys.stdin.readline
output = sys.stdout.write

# 입력
T = int(input())

# 쿼리마다 연산 수행
for _ in range(T):
  N = int(input())
  rankArr = list(map(int, input().split()))
  M = int(input())
  changeArr = [list(map(int, input().split())) for _ in range(M)]

  # remainFrontArr[i] : 남아있는 사람중 i 보다 앞에있는 사람의 수
  remainFrontArr = [0] * (N + 1)

  # mapArr[i]: i 보다 뒤에 있던 사람들의 목록
  mapArr = [{} for _ in range(N + 1)]
  for i in range(N):
    now = rankArr[i]
    remainFrontArr[now] = i
    for j in range(i + 1, N):
      next = rankArr[j]
      mapArr[now][next] = 1

  # 랭킹이 바뀐것을 반영한다.
  for changeInfo in changeArr:
    a, b = changeInfo

    if mapArr[a].get(b) == 1:
      # a 가 b 앞에 있었다가 순서가 바뀐 경우
      mapArr[a][b] = 0
      mapArr[b][a] = 1
      remainFrontArr[a] += 1
      remainFrontArr[b] -= 1
    else:
      # b 가 a 앞에 있었다가 순서가 바뀐 경우
      mapArr[a][b] = 1
      mapArr[b][a] = 0
      remainFrontArr[a] -= 1
      remainFrontArr[b] += 1

  # backListArr[i]: i 보다 뒤에 있는 사람들의 목록
  backListArr = [[int(key) for key in mapInfo.keys() if mapInfo[key] == 1] for mapInfo in mapArr]

  # isVisit[i]: i 의 최종 순위. 정해지지 않았으면 0
  # newRankArr[i]: 최종적으로 i 등인 사람의 번호.
  isVisit = [0] * (N + 1)
  newRankArr = [0] * N

  # 방문큐. deque로 구현했다.
  visitQueue = deque()

  for idx in range(1, N + 1):
    if remainFrontArr[idx] == 0:
      visitQueue.append(idx)
      isVisit[idx] = 1

  # 랭킹을 한 명씩 차례대로 넣는다
  nowIdx = 0
  isError = False
  while visitQueue:
    nowPeople = visitQueue.popleft()
    newRankArr[nowIdx] = nowPeople
    nowIdx += 1
    isVisit[nowPeople] = nowIdx

    # nowPeople 을 완료했으니 이를 목록에서 제거한걸 반영한다.
    for nextPeople in backListArr[nowPeople]:
      # 만약 다음 사람의 랭킹이 이미 정해졌었다면 루프를 돌고있는 것이다.
      # 이는 발생할 수 없다.
      if isVisit[nextPeople] != 0:
        output(f"IMPOSSIBLE\n")
        isError = True
        break

      remainFrontArr[nextPeople] -= 1

      if remainFrontArr[nextPeople] == 0:
        visitQueue.append(nextPeople)

    if isError:
      break

    # 방문큐에 사람이 2명이상 남았다는것 = 본인보다 앞선 사람이 없는 경우가 2개 이상이라는것
    # 이는 다음 순위가 확실하지 않다는 뜻이다.
    if len(visitQueue) > 1:
      output(f"?\n")
      isError = True
      break

  if isError:
    continue

  # 아직 랭킹이 정해지지 않은 사람이 있다면 그 사람들끼리 루프를 돌고있는것이다.
  # 이는 데이터에 일관성이 없다는 뜻이다.
  numRemainPeople = sum(1 for val in isVisit if val == 0)
  if numRemainPeople > 1:
    output(f"IMPOSSIBLE\n")
    continue

  # 모든 에러상황을 통과했으면 순위를 출력한다.
  output(f"{' '.join(map(str, newRankArr))}\n")
