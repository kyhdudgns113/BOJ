import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

while T > 0:
  A, B = map(int, input().split())
  output(f"{A + B}\n")
  T -= 1