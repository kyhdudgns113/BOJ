import sys

input = sys.stdin.readline
output = sys.stdout.write

while True:
  S = input()
  if len(S) == 0:
    break
  output(S)