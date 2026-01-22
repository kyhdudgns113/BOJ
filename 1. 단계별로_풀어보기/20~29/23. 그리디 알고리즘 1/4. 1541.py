import sys

input = sys.stdin.readline
output = sys.stdout.write

equation = list(input().strip())

result = 0
nowNum = 0
isMinus = False

for c in equation:
  if ord('0') <= ord(c) <= ord('9'):
    nowNum *= 10
    nowNum += int(c)
  else:
    result += -nowNum if isMinus else nowNum
    nowNum = 0
    if c == '-':
      isMinus = True

result += -nowNum if isMinus else nowNum

output(f"{result}")