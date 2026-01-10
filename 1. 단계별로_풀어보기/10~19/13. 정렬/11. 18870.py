from bisect import bisect_left
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
XArr = list(map(int, input().split()))

XSet = set(XArr)
XSorted = sorted(XSet)

output(f"{' '.join(str(bisect_left(XSorted, X)) for X in XArr)}")