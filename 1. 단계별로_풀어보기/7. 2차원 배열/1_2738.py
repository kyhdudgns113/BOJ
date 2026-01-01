import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

A = list(list(map(int, input().split())) for i in range(N))
B = list(list(map(int, input().split())) for i in range(N))

resultArr = [[A[i][j] + B[i][j] for j in range(M)] for i in range(N)]

for row in resultArr:
  output(f"{' '.join(str(elem) for elem in row)}\n")
