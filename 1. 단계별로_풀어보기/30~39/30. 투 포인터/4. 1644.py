import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

isPrime = [True] * 4000001
primeArr = []

for i in range(2, 2000):
  if isPrime[i]:
    for j in range(2, (4000000 // i) + 1):
      isPrime[i * j] = False

for i in range(2, 4000000):
  if isPrime[i]:
    primeArr.append(i)

left = 0
right = 0
primeSum = primeArr[0]

arrLen = len(primeArr)

result = 0

while left <= right and right < arrLen:
  if primeSum == N:
    result += 1

  if N < primeSum:
    primeSum -= primeArr[left]
    left += 1
  elif right + 1 < arrLen:
    right += 1
    primeSum += primeArr[right]
  else:
    break

  if primeArr[left] > N:
    break

output(f"{result}")