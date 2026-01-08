import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B, C, D, E, F = map(int, input().split())

X = (C * E - F * B) / (A * E - B * D)
Y = (C * D - A * F) / (B * D - E * A)

output(f"{int(X)} {int(Y)}")