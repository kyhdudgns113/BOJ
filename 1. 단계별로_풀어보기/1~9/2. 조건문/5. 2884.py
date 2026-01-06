import sys, math

input = sys.stdin.readline
output = sys.stdout.write

H, M = map(int, input().split())

HM = 60 * H + M + 1440 - 45

resultH = (HM // 60) % 24
resultM = HM % 60

output(f"{resultH} {resultM}")