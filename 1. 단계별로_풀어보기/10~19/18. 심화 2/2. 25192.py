import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

usedUser = set()
result = 0

for _ in range(N):
  log = input().strip()

  if log == 'ENTER':
    usedUser = set()
  else:
    if log not in usedUser:
      usedUser.add(log)
      result += 1


output(f"{result}")
  