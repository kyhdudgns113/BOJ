import sys

input = sys.stdin.readline
output = sys.stdout.write

S = list(input().strip())

SReverse = S.copy()
SReverse.reverse()

result = 0

if S == SReverse:
  result = 1

output(str(result))