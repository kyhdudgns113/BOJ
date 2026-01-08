import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
cardArr = list(map(int, input().split()))

cardArr.sort()

maxSum = 0

for i in range(N):
  card0 = cardArr[i]

  for j in range(i + 1, N):
    card1 = cardArr[j]
    sum01 = card0 + card1

    # 혹여나 중간에 합이 넘어버리면 탈출
    if sum01 >= M:
      break

    for k in range(j + 1, N):
      sum012 = sum01 + cardArr[k]

      if sum012 <= M:
        maxSum = max(maxSum, sum012)
      else: # 여기도 마찬가지로 합이 넘어버리면 반복문을 더 돌 필요가 없다
        break

output(f"{maxSum}")