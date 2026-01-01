import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())

if (A > B):
  output(f">")
elif (A < B):
  output(f"<")
else:
  output(f"==")