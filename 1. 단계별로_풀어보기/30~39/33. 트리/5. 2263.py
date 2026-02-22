import sys

sys.setrecursionlimit(100005)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
LVR = list(map(int, input().split()))
LRV = list(map(int, input().split()))

position = [0] * (N + 1)
for i in range(N):
  position[LVR[i]] = i

def getVLR(inLeft, inRight, postLeft, postRight):
  if inLeft > inRight or postLeft > postRight:
    return

  if postLeft == postRight:
    output(f"{LRV[postRight]} ")
    return

  root = LRV[postRight]
  delta = position[root] - inLeft

  output(f"{root} ")
  getVLR(inLeft, position[root] - 1, postLeft, postLeft + delta - 1)
  getVLR(position[root] + 1, inRight, postLeft + delta, postRight - 1)

getVLR(0, N - 1, 0, N - 1)
