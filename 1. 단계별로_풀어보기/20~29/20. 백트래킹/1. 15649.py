from itertools import permutations
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

for row in permutations(range(1, N + 1), M):
  output(f"{' '.join(str(num) for num in row)}\n")