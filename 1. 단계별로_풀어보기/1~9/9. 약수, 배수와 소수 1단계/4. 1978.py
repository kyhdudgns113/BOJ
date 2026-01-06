import math, sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(map(int, input().split()))

isPrime = [True] * 1001
isPrime[0] = False
isPrime[1] = False

for i in range(2, math.floor(math.sqrt(1001) + 1)):
  temp = i * 2
  while temp <= 1000:
    isPrime[temp] = False
    temp += i

resultArr = [1 if isPrime[temp] else 0 for temp in numArr]
output(f"{sum(resultArr)}")
