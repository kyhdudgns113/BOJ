import sys

sys.setrecursionlimit(20000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
A = list(map(int, input().split()))

incArr = [0] * N
decArr = [0] * N

incArr[0] = 1
decArr[N - 1] = 1

def getInc(n):
  if incArr[n] > 0:
    return incArr[n]
  
  incArr[n] = max([1] + list((getInc(i) + 1) for i in range(n) if A[i] < A[n]))
  return incArr[n]

def getDec(n):
  global N

  if decArr[n] > 0:
    return decArr[n]

  decArr[n] = max([1] + list((getDec(i) + 1) for i in range(n + 1, N) if A[i] < A[n]))
  return decArr[n]

def getBitonic(n):
  return getInc(n) + getDec(n) - 1

output(f"{max(getBitonic(i) for i in range(N))}")