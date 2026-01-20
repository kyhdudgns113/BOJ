import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
mapArr = list(list(map(int, input().split())) for i in range(N))

# 이렇게만 해도 배열의 0번째 원소를 기준으로 정렬한다
mapArr.sort()

resultArr = [None] * N
resultArr[0] = 1

def getResult(n):
  if resultArr[n] != None:
    return resultArr[n]

  resultArr[n] = max([1] + list((getResult(prev) + 1) for prev in range(n) if mapArr[prev][1] < mapArr[n][1]))
  return resultArr[n]

output(f"{N - max(getResult(i) for i in range(N))}")