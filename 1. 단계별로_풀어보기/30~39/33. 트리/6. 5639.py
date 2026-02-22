from bisect import bisect_left
import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

VLR = []

while True: 
  try:
    VLR.append(int(input()))
  except:
    break

def getLRV(left, right):
  if left > right:
    return ''
  
  if left == right:
    return f"{VLR[left]}\n"
  
  V = VLR[left]

  firstRight = bisect_left(VLR, V, left + 1, right + 1)

  if left + 1 == firstRight:
    return getLRV(left + 1, right) + f"{V}\n"
  else:
    return getLRV(left + 1, firstRight - 1) + getLRV(firstRight, right) + f"{V}\n"


output(getLRV(0, len(VLR) - 1))