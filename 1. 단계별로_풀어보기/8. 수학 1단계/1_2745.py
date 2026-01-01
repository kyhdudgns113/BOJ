import sys

input = sys.stdin.readline
output = sys.stdout.write

N, B = input().strip().split(' ')
N = list(N)
B = int(B)

result = 0

aAscii = ord('A')
zeroAscii = ord('0')
nineAscii = ord('9')

for char in N:
  result *= B

  charAscii = ord(char)

  if zeroAscii <= charAscii <= nineAscii:
    result += charAscii - zeroAscii
  else:
    result += charAscii - aAscii + 10

output(f"{result}")

