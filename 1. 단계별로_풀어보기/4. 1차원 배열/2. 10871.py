import sys

input = sys.stdin.readline
output = sys.stdout.write

N, X = map(int, input().split())
numArr = list(map(int, input().split()))

result = [str(x) for x in numArr if x < X]

output(f"{" ".join(result)}")