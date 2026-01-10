import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

infoArr = list([int(a), b, idx] for idx in range(N) for a, b in [input().strip().split()])

infoArr.sort(key=lambda x: (x[0], x[2]))

for info in infoArr:
  output(f"{info[0]} {info[1]}\n")