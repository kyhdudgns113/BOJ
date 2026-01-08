import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

for result in range(1, N + 1):
  # result 의 각 자리 숫자들의 배열
  numArr = list(map(int, list(str(result))))

  if sum(numArr) + result == N:
    output(f"{result}")
    exit(0)

output('0')

