import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
listenSet = set(input().strip() for i in range(N))
lookSet = set(input().strip() for i in range(M))

deutBoSet = listenSet & lookSet
deutBoArr = sorted(deutBoSet)

output(f"{len(deutBoArr)}\n")
for name in deutBoArr:
  output(f"{name}\n")