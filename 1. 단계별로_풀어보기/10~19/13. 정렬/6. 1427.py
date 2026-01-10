import sys

input = sys.stdin.readline
output = sys.stdout.write

N = list(input().strip())

N.sort(reverse=True)

output(f"{''.join(N)}")