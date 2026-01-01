import sys

input = sys.stdin.readline
output = sys.stdout.write

n = int(input())

output(f"{(n * (n + 1)) // 2}")