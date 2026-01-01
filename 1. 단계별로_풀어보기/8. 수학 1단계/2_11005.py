import sys, math

input = sys.stdin.readline
output = sys.stdout.write

N, B = map(int, input().split(' '))

result = ''

while N > 0:
  M = N % B

  if M < 10:
    result = str(M) + result
  else:
    result = chr(M - 10 + ord('A')) + result

  N = math.floor(N / B)

output(f"{result}")