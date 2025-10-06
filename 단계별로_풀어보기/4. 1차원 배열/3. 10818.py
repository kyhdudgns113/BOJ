import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(map(int, input().split()))

output(f"{min(numArr)} {max(numArr)}")