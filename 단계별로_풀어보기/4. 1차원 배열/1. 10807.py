import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(map(int, input().split()))
v = int(input())

result = numArr.count(v)

output(f"{result}")