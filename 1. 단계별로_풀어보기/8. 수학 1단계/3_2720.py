import math, sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())
CArr = list(int(input()) for i in range(T))

for C in CArr:
  # 25센트 계산
  div25 = math.floor(C / 25)
  C -= div25*25

  # 10센트 계산
  div10 = math.floor(C / 10)
  C -= div10*10

  # 5센트 계산
  div5 = math.floor(C / 5)
  C -= div5*5

  # 남은 C 가 1센트이다
  div1 = C

  output(f"{div25} {div10} {div5} {div1}\n")


