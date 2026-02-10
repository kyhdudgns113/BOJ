import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
A = list(map(int, input().split()))
X = int(input())

A.sort()

left = 0
right = N - 1

result = 0

while left < right:
  if A[left] + A[right] == X:
    result += 1
    left += 1
    right -= 1
  elif A[left] + A[right] < X:
    left += 1
  else:
    right -= 1
  
output(f"{result}")