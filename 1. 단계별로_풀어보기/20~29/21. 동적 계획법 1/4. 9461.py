import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())
testArr = list(int(input()) for i in range(T))

# 결과를 저장할 배열 변수
P = [False] * 101

# 종료조건 미리 연산
P[1] = 1
P[2] = 1
P[3] = 1
P[4] = 2
P[5] = 2

# N 의 최대값이 100 이다. 이것의 2배보다 여유롭게 선언한다.
callStack = [False] * 300

stackIdx = 0
callStack[stackIdx] = 100

# Top-Down 방식으로 연산
while stackIdx >= 0:
  n = callStack[stackIdx]

  if P[n] != False:
    callStack[stackIdx] = False # 안해도 되긴 한다.
    stackIdx -= 1
    continue

  n1 = P[n - 1]
  if n1 == False:
    stackIdx += 1
    callStack[stackIdx] = n - 1
    continue

  # n1 을 계산하면서 n5 도 순차적으로 계산이 되기는 한다.
  # 알고리즘 이해를 위해 굳이 넣었다.
  n5 = P[n - 5]
  if n5 == False:
    stackIdx += 1
    callStack[stackIdx] = n - 5
    continue

  P[n] = n1 + n5
  callStack[stackIdx] = False
  stackIdx -= 1

for test in testArr:
  output(f"{P[test]}\n")
