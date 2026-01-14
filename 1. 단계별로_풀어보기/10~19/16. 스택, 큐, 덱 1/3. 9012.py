from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())
stringArr = list(list(input().strip()) for i in range(T))

for string in stringArr:
  result = 'YES'
  stack = deque()
  for c in string:
    if c == '(':
      stack.append(c)
    elif len(stack) == 0:
      result = 'NO'
      break
    else:
      stack.pop()

  if len(stack) > 0:
    result ='NO'
  
  output(f"{result}\n")