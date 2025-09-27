import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())
C = int(input())

ABC = 60 * A + B + C

hour = (ABC // 60) % 24
minute = ABC % 60

output(f"{hour} {minute}")