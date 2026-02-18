import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
A = list(map(int, input().split()))

tempArr = []
prevIdxArr = [-1] * N

tempArr.append([A[0], 0])

def binarySearch(tempArr, val, left, right):
  if left == right:
    if tempArr[left][0] < val:
      return left + 1
    else:
      return left

  mid = (left + right) // 2
  midVal = tempArr[mid][0]

  if val == midVal:
    return mid
  elif midVal < val:
    return binarySearch(tempArr, val, mid + 1, right)
  else:
    return binarySearch(tempArr, val, left, mid)

for i in range(1, N):
  val = A[i]
  insertIdx = binarySearch(tempArr, val, 0, len(tempArr) - 1)

  if insertIdx == len(tempArr):
    lastElemIdx = tempArr[insertIdx - 1][1]
    tempArr.append([A[i], i])
    prevIdxArr[i] = lastElemIdx

  else:
    tempArr[insertIdx] = [A[i], i]

    if insertIdx > 0:
      prevIdxArr[i] = tempArr[insertIdx - 1][1]
    else:
      prevIdxArr[i] = -1

resultArr = []
nowIdx = tempArr[-1][1]

while nowIdx != -1:
  resultArr.append(A[nowIdx])
  nowIdx = prevIdxArr[nowIdx]

resultArr.reverse()

output(f"{len(resultArr)}\n")
output(" ".join(map(str, resultArr)) + "\n")
