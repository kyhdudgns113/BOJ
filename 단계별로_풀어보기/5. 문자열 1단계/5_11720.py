import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = map(int, list(input().strip()))

output(f"{sum(numArr)}")