import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B, C = map(int, input().split())

modArr = [0] * 33
modArr[0] = A % C

for i in range(1, 33):
  modArr[i] = (modArr[i - 1] * modArr[i - 1]) % C

result = 1

remain = B
idx = 0

while remain > 0:
  mul = remain & 1
  
  if mul:
    result = (result * modArr[idx]) % C

  remain = remain // 2
  idx += 1

output(f"{result}")