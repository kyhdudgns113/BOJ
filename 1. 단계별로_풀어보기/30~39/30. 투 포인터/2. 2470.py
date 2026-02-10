import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
liquidArr = list(map(int, input().split()))

liquidArr.sort()

result = 2 * (10 ** 9) + 1
small = 0
big = 0

left = 0
right = N - 1

while left < right:
  tempSum = liquidArr[left] + liquidArr[right]

  if abs(tempSum) < result:
    result = abs(tempSum)
    small = liquidArr[left]
    big = liquidArr[right]
  
  if tempSum > 0:
    right -= 1
  else:
    left += 1

output(f"{small} {big}")