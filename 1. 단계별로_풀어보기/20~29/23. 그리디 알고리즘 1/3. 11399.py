import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
P = list(map(int, input().split()))

P.sort()

result = sum((N - i) * P[i] for i in range(N))

output(f"{result}")