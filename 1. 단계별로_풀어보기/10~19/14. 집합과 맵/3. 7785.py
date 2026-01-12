import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

logArr = list(list(input().strip().split()) for i in range(N))

dict = {}

for log in logArr:
  name, status = log

  if status == 'enter':
    dict[name] = True
  else:
    dict[name] = False

nameArr = list(key for key in dict.keys() if dict[key])
nameArr.sort()
nameArr.reverse()

for name in nameArr:
  output(f"{name}\n")