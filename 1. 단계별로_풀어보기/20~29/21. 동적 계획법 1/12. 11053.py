import sys

sys.setrecursionlimit(10 ** 5)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
A = list(map(int, input().split()))

resultArr = [-1 for i in range(N)]
resultArr[0] = 1

def getResult(n):
  if resultArr[n] != -1:
    return resultArr[n]

  resultArr[n] = max([0] + list(getResult(i) for i in range(n) if A[i] < A[n])) + 1
  return resultArr[n]

output(f"{max(getResult(i) for i in range(N))}")