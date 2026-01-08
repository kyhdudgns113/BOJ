import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

result = -1
cnt3 = 0

while cnt3*3 <= N:
  remain = N - cnt3 * 3

  if remain % 5 == 0:
    result = cnt3 + (remain // 5)
    break

  cnt3 += 1

output(f"{result}")