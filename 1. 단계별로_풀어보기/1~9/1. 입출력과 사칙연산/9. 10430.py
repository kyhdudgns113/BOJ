import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B, C = map(int, input().split(' '))

output(f"{(A + B) % C}\n")
output(f"{((A % C) + (B % C)) % C}\n")
output(f"{(A * B) % C}\n")
output(f"{((A % C) * (B % C)) % C}")