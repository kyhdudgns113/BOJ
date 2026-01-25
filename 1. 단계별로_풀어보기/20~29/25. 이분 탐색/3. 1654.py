import sys

input = sys.stdin.readline
output = sys.stdout.write

K, N = map(int, input().split())
lineArr = list(int(input()) for i in range(K))

def getSticks(div):
  return sum(line // div for line in lineArr)

def binarySearch(minLen, maxLen):
  if minLen == maxLen:
    return minLen

  if minLen + 1 == maxLen:
    return maxLen if getSticks(maxLen) >= N else minLen

  halfLen = (minLen + maxLen) // 2

  if getSticks(halfLen) >= N:
    return binarySearch(halfLen, maxLen)
  else:
    return binarySearch(minLen, halfLen)

output(f"{binarySearch(0, max(lineArr))}")