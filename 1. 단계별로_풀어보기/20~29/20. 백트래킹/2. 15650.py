from itertools import combinations
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

for row in combinations(range(1, N + 1), M):
  output(f"{' '.join(str(n) for n in row)}\n")