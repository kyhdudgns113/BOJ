import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

axisArr = [list(map(int, input().split())) for _ in range(N)]

axisArr.sort(key=lambda x: (x[1], x[0]))

for axis in axisArr:
  output(f"{axis[0]} {axis[1]}\n")
