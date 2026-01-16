from itertools import product
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

for row in product(range(1, N + 1), repeat=M):
  output(f"{' '.join(str(n) for n in row)}\n")