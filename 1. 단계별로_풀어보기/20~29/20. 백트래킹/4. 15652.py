from itertools import combinations_with_replacement
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

for row in combinations_with_replacement(range(1, N + 1), M):
  output(f"{' '.join(str(n) for n in row)}\n")