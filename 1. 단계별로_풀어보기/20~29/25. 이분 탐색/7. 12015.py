import sys

sys.setrecursionlimit(1000)

# 입력
input = sys.stdin.readline
output = sys.stdout.write

# 입력 파싱
N = int(input())
A = list(map(int, input().split()))

# 짝퉁 부분수열 저장할 변수
partArr = [0] * (N + 1)
arrLen = 0

def findPlace(val, minIdx, maxIdx):  
  if minIdx == maxIdx:
    return minIdx
  
  if minIdx + 1 == maxIdx:
    if arrLen == minIdx or val <= partArr[minIdx]:
      return minIdx
    return maxIdx
  
  halfIdx = (minIdx + maxIdx) // 2
  midVal = partArr[halfIdx]
  
  if val == midVal:
    return halfIdx
  elif val < midVal:
    return findPlace(val, minIdx, halfIdx)
  else:
    return findPlace(val, halfIdx + 1, maxIdx)

# 앞 순서부터 연산
for a in A:
  myIdx = findPlace(a, 0, arrLen)
  partArr[myIdx] = a
  if arrLen == myIdx:
    arrLen += 1

# 출력
output(f"{arrLen}\n")
