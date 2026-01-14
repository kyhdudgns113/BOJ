from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

while True:
  charArr = list(input())

  if len(charArr) == 2 and charArr[0] == '.':
    break

  result = 'yes'
  stack = deque()

  for c in charArr:
    if c == '(' or c == '[' or c == '{':
      stack.append(c)
    elif c == ')' and len(stack) > 0 and stack[-1] == '(':
      stack.pop()
    elif c == ']' and len(stack) > 0 and stack[-1] == '[':
      stack.pop()
    elif c == '}' and len(stack) > 0 and stack[-1] == '{':
      stack.pop()
    elif c == ')' or c == ']' or c == '}':
      result = 'no'
      break
  
  if len(stack) > 0:
    result = 'no'

  output(f"{result}\n")