import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

scoreArr = list(map(int, input().split()))

output(f"{sum(scoreArr) / max(scoreArr) * 100 / N}")