import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

while T:
  A, B = map(int, input().split())
  output(f"{A + B}\n")
  T -= 1