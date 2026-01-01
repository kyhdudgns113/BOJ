import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

while T > 0:
  R, S = input().strip().split()
  R = int(R)

  resultS = ''.join([s * R for s in S])

  output(f"{resultS}\n")

  T -= 1