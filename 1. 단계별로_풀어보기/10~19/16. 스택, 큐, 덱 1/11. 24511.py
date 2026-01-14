from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
AArr = list(map(int, input().split()))
BArr = list(map(int, input().split()))

M = int(input())
CArr = list(map(int, input().split()))

BQueue = deque(BArr[i] for i in range(N) if AArr[i] == 0)
BQueue.reverse()

for C in CArr:
  BQueue.append(C)

output(" ".join(map(str, list(BQueue)[:M])))


