import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

for i in range(1, T + 1):
  A, B = map(int, input().split())
  output(f"Case #{i}: {A} + {B} = {A + B}\n")