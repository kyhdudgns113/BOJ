import sys, math

input = sys.stdin.readline
output = sys.stdout.write

X = int(input())
N = int(input())

sums = sum(math.prod(map(int, input().split())) for i in range(N))

output(f"{'Yes' if X == sums else 'No'}")