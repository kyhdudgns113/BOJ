import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())
MOD = 1000000007

m = min(K, N - K)

upSide = 1
downSide = 1

for i in range(m):
  upSide = (upSide * (N - i)) % MOD
  downSide = (downSide * (i + 1)) % MOD

expArr = [0] * 33
expArr[0] = 1
expArr[1] = downSide % MOD

for i in range(2, 33):
  expArr[i] = (expArr[i - 1] * expArr[i - 1]) % MOD

expResult = 1
idx = 1
remain = MOD - 2
while remain > 0:
  if remain % 2 == 1:
    expResult = (expResult * expArr[idx]) % MOD
  remain //= 2
  idx += 1

result = (upSide * expResult) % MOD

output(f"{result}")