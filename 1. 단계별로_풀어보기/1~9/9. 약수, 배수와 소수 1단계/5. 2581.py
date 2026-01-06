import sys

input = sys.stdin.readline
output = sys.stdout.write

M = int(input())
N = int(input())

isPrime = list(True for i in range(10001))
isPrime[0] = False
isPrime[1] = False

for i in range(2, 101):
  temp = 2 * i
  while temp <= 10000:
    isPrime[temp] = False
    temp += i

primeArr = [i for i in range(M, N + 1) if isPrime[i]]

if len(primeArr) == 0:
  output(f"-1")
else:
  output(f"{sum(primeArr)}\n{primeArr[0]}")