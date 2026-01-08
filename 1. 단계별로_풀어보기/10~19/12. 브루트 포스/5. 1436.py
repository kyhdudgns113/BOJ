import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

cnt = 0
result = 666

while True:
  tempRes = result

  con6 = 0
  while tempRes > 0:
    nowNum = tempRes % 10

    if nowNum == 6:
      con6 += 1
    else:
      con6 = 0

    if con6 == 3:
      cnt += 1
      break
    tempRes //= 10
  
  if cnt == N:
    output(f"{result}")
    break

  result += 1
