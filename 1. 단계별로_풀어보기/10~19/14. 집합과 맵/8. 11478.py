import sys

input = sys.stdin.readline
output = sys.stdout.write

S = list(input().strip())

dict = {}

lenS = len(S)

for i in range(lenS):
  for j in range(i, lenS):
    tempS = ''.join(S[i:j+1])
    dict[tempS] = 1

output(f"{len(dict)}")

