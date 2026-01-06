import sys

input = sys.stdin.readline
output = sys.stdout.write

S = input().strip()
lenS = len(S)

croat2Arr = [
  'c=',
  'c-',
  'd-',
  'lj',
  'nj',
  's=',
  'z='
]

result = 0
idx = 0

while idx < lenS:
  if idx + 1 < lenS and S[idx:idx+2] in croat2Arr:
    idx += 1
  if idx + 2 < lenS and S[idx:idx+3] == 'dz=':
    idx += 2
  idx += 1
  result += 1

output(f"{result}")