import sys

input = sys.stdin.readline
output = sys.stdout.write

X = int(input())
Y = int(input())

xx = 1.5 if X > 0 else 0.5
yy = -1 if Y > 0 else 1

result = int(2.5 + xx * yy)

output(f"{result}")