import sys

input = sys.stdin.readline
output = sys.stdout.write

while True:
  A, B = map(int, input().split())

  if A == 0 and B == 0:
    break

  output(f"{A + B}\n")