import sys

input = sys.stdin.readline
output = sys.stdout.write

N, B = map(int, input().split())
A = list(list(map(int, input().split())) for i in range(N))

def matMul(matA, matB):
  maxN = len(matA)
  maxM = len(matB)
  maxK = len(matB[0])

  result = list(list(0 for k in range(maxK)) for n in range(maxN))

  for n in range(maxN):
    for k in range(maxK):
      for m in range(maxM):
        result[n][k] += matA[n][m] * matB[m][k]
        result[n][k] %= 1000

  return result

expArr = [0] * 48
expArr[0] = A

for i in range(1, 48):
  expArr[i] = matMul(expArr[i - 1], expArr[i - 1])

result = list(list(0 for i in range(N)) for j in range(N))

for i in range(N):
  result[i][i] = 1

idx = 0

while B > 0:
  if B & 1 == 1:
    result = matMul(result, expArr[idx])
  
  B //= 2
  idx += 1

for row in result:
  output(f"{' '.join(str(num) for num in row)}\n")


