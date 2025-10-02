import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

output('\n'.join('*' * i for i in range(1, N + 1)))