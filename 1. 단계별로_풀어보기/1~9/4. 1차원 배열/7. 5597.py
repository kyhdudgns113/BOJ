import sys

input = sys.stdin.readline
output = sys.stdout.write

studentArr = [i + 1 for i in range(30)]

for i in range(28):
  student = int(input())
  studentArr[student - 1] = 0

for s in studentArr:
  if s > 0:
    output(f"{s} ")