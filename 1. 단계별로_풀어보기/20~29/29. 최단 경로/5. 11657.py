import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
ABCArr = list(list(map(int, input().split())) for i in range(M))

distArr = [5000001] * (N + 1)

def bellmanFord(start):
  distArr[start] = 0

  for i in range(N):
    for j in range(M):
      A, B, C = ABCArr[j]

      if distArr[A] != 5000001 and distArr[A] + C < distArr[B]:
        if i == N - 1:
          return True
        distArr[B] = distArr[A] + C

  return False

isInfinity = bellmanFord(1)

if isInfinity:
  output(f"-1")
else:
  output(f"{'\n'.join('-1' if dist == 5000001 else str(dist) for dist in distArr[2::])}")