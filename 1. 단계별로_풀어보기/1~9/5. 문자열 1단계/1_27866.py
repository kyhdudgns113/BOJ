import sys

input = sys.stdin.readline
output = sys.stdout.write

S = list(input().strip())
i = int(input())

output(f"{S[i - 1]}")