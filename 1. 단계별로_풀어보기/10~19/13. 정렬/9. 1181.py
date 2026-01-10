import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

wordArr = list(input().strip() for i in range(N))

wordArr.sort(key=lambda x: (len(x), x))

for i in range(N):
  if i > 0 and wordArr[i] == wordArr[i - 1]:
    continue
  output(f"{wordArr[i]}\n")