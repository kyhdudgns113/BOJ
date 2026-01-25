import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
K = int(input())

def findLessCnt(val):
  global N
  result = 0
  for i in range(1, N + 1):
    if (val - 1) >= N * i:
      result += N
    elif val - 1 >= i:
      result += (val - 1) // i
    else:
      break
  return result

def binarySearch(start, end):
  global K

  if start == end:
    return start
  if start + 1 == end:
    if findLessCnt(end) <= K - 1:
      return end
    return start
  
  mid = (start + end) // 2
  
  lessThenMid = findLessCnt(mid)
  
  if lessThenMid > K - 1:
    return binarySearch(start, mid - 1)
  else:
    return binarySearch(mid, end)
  
output(f"{binarySearch(0, min(10 ** 9, N * N))}")