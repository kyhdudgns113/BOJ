from functools import cmp_to_key
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = [int(input()) for _ in range(N)]

def cmp(a, b):
  return a - b

numArr.sort(key=cmp_to_key(cmp))

output(f"\n".join(str(num) for num in numArr))