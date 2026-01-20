import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

prev2 = 0
prev1 = 1

for i in range(N):
  prev1, prev2 = (prev1 + prev2) % 15746, prev1

output(f"{prev1}")