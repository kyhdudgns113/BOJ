import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
recordArr = list(input().strip() for i in range(N))

dancers = set()
dancers.add('ChongChong')

for record in recordArr:
  A, B = record.split()

  if A in dancers or B in dancers:
    dancers.add(A)
    dancers.add(B)

output(f"{len(dancers)}")