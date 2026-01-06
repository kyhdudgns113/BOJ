import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

while T > 0:
  string = list(input().strip())
  output(f"{string[0]}{string[-1]}\n")
  T -= 1