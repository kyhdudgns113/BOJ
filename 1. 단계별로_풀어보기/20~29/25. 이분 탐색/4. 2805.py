import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
treeArr = list(map(int, input().split()))

def getRemain(height):
  return sum(tree - height for tree in treeArr if tree > height)

def binarySearch(minLen, maxLen):
  if minLen == maxLen:
    return minLen
  
  if minLen + 1 == maxLen:
    if getRemain(maxLen) >= M:
      return maxLen
    return minLen

  halfLen = (minLen + maxLen) // 2
  remain = getRemain(halfLen)

  if remain < M:
    return binarySearch(minLen, halfLen - 1)
  elif remain > M:
    return binarySearch(halfLen, maxLen)
  else:
    return halfLen

output(f"{binarySearch(0, max(treeArr))}")