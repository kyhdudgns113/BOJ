import math, sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

testCaseArr = list(list(map(int, input().split())) for i in range(T))


for row in testCaseArr:
  A, B = row
  lcm = math.lcm(A, B)
  output(f"{lcm}\n")