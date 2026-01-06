import sys

input = sys.stdin.readline
output = sys.stdout.write

M = list(list(map(int, input().split())) for i in range(9))

max_row = 0
max_col = 0
maxValue = -1

for idx_row in range(9):
  for idx_col in range(9):
    if maxValue < M[idx_row][idx_col]:
      maxValue = M[idx_row][idx_col]
      max_row = idx_row
      max_col = idx_col

output(f"{maxValue}\n{max_row + 1} {max_col + 1}")