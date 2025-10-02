import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

for i in range(1, 10):
  output(f"{N} * {i} = {N * i}\n")