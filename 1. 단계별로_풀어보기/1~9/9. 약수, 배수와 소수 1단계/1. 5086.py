import sys

input = sys.stdin.readline
output = sys.stdout.write

while True:
  A, B = map(int, input().split())

  if A == 0 and B == 0:
    break

  if (A % B) == 0:
    output(f"multiple\n")
  elif (B % A) == 0:
    output(f"factor\n")
  else:
    output(f"neither\n")