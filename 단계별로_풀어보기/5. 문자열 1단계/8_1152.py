import sys

input = sys.stdin.readline
output = sys.stdout.write

S = input().strip().split(' ')

result = sum(list(1 if len(word) > 0 else 0 for word in S))

output(f"{result}")