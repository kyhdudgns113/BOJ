import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = input().strip().split(' ')

A = int(A[::-1])
B = int(B[::-1])

output(f"{A if A > B else B}")