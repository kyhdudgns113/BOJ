import sys

input = sys.stdin.readline
output = sys.stdout.write

N, C = map(int, input().split())
houseArr = list(int(input()) for i in range(N))
houseArr.sort()

def isWiFiSettable(dist):
  # 0번째 집에는 무조건 설치한다.
  remain = C - 1

  # 남은 누적 거리
  accDist = 0

  for i in range(1, N):
    accDist += houseArr[i] - houseArr[i - 1]
    if accDist >= dist:
      accDist = 0
      remain -= 1

      if remain == 0:
        return True

  return False

def binarySearch(minDist, maxDist):
  if minDist == maxDist:
    return minDist

  if minDist + 1 == maxDist:
    if isWiFiSettable(maxDist):
      return maxDist
    return minDist

  halfDist = (minDist + maxDist) // 2
  
  if isWiFiSettable(halfDist):
    return binarySearch(halfDist, maxDist)
  else:
    return binarySearch(minDist, halfDist - 1)

output(f"{binarySearch(1, houseArr[N - 1] - houseArr[0])}")