import sys

input = sys.stdin.readline
output = sys.stdout.write

sortedArr = list(map(int, input().split()))
sortedArr.sort()

A, B, C = sortedArr

score = 0

if A == B and B == C:
  score = 10000 + 1000 * A
elif A == B or B == C:
  score = 1000 + 100 * B
else:
  score = 100 * C

output(f"{score}")