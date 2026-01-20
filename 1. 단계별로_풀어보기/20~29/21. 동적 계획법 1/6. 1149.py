import sys

sys.setrecursionlimit(10 ** 5)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
rgbArr = list(list(map(int, input().split())) for i in range(N))

resultArr = [[-1 for i in range(3)] for j in range(1001)]

def getResult(n, rgb):
  if n == 0:
    resultArr[n][rgb] = rgbArr[0][rgb]
    return resultArr[n][rgb]
  
  if resultArr[n][rgb] != -1:
    return resultArr[n][rgb]

  resultArr[n][rgb] = min(getResult(n - 1, (rgb + 1) % 3), getResult(n - 1, (rgb + 2) % 3)) + rgbArr[n][rgb]
  return resultArr[n][rgb]

output(f"{min(getResult(N - 1, 0), getResult(N - 1, 1), getResult(N - 1, 2))}")