import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

result = 'long ' * (N // 4) + 'int'

output(f"{result}")