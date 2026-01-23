import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
A = list(list(map(int, input().split())) for i in range(N))
M, K = map(int, input().split())
B = list(list(map(int, input().split())) for i in range(M))

result = list(list(0 for i in range(K)) for j in range(N))

for n in range(N):
  for k in range(K):
    for m in range(M):
      result[n][k] += A[n][m] * B[m][k]

for row in result:
  output(f"{' '.join(str(num) for num in row)}\n")