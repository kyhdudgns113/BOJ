import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B, C = map(int, input().split())

result = A + B + C

output(f"{result}")