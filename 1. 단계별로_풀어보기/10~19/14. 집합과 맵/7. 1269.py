import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

ASet = set(map(int, input().split()))
BSet = set(map(int, input().split()))

ABSet = ASet & BSet

result = len(ASet) + len(BSet) - 2 * len(ABSet)

output(f"{result}")