from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

# nextArr[i]: i번째 사람보다 확실히 작은 사람들의 목록
# push 연산과 검색만 하기 때문에 배열로 선언해도 시간초과 안난다.
nextArr = list([] for i in range(N + 1))

# remainArr[i]: i번째 사람보다 확실히 큰 사람들의 수
remainArr = list(0 for i in range(N + 1))

for _ in range(M):
  A, B = map(int, input().split())
  nextArr[A].append(B)
  remainArr[B] += 1

# 방문큐
visitQueue = deque()

# 본인보다 확실히 큰 사람이 없는 사람들을 방문큐에 넣는다.
for people in range(1, N + 1):
  if remainArr[people] == 0:
    visitQueue.append(people)

while visitQueue:
  now = visitQueue.popleft()
  output(f"{now} ")

  for next in nextArr[now]:
    remainArr[next] -= 1
    
    # 더 이상 next 보다 확실히 큰 사람은 없으면 방문큐에 넣는다
    if remainArr[next] == 0:
      visitQueue.append(next)