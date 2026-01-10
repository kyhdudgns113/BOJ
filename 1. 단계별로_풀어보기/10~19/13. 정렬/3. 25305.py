import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())
scoreArr = list(map(int, input().split()))

scoreArr.sort(reverse = True)

output(f"{scoreArr[K - 1]}")