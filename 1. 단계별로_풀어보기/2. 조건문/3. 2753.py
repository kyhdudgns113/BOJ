import sys

input = sys.stdin.readline
output = sys.stdout.write

year = int(input())

if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
  output(f"1")
else:
  output(f"0")