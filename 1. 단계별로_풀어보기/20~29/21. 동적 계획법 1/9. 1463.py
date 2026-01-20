import sys

sys.setrecursionlimit(10 ** 6)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

resultArr = [-1] * (N + 1)
resultArr[1] = 0 # 여기서 이거 안하면 Python3 에서 시간초과 난다.

def getResult(n):

  if resultArr[n] != -1:
    return resultArr[n]

  resultArr[n] = n

  if n % 3 == 0:
    resultArr[n] = min(resultArr[n], getResult(n // 3) + 1)
  
  if n % 2 == 0:
    resultArr[n] = min(resultArr[n], getResult(n // 2) + 1)

  resultArr[n] = min(resultArr[n], getResult(n - 1) + 1)
  return resultArr[n]

output(f"{getResult(N)}")