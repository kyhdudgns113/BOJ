import sys

input = sys.stdin.readline
output = sys.stdout.write

while True:
  try:
    A, B = map(int, input().split())
    output(f"{A + B}\n")
  except:
    exit()