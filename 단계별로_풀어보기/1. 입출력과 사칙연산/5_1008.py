#
# 1-4. 1008: A/B
#
# 입력
#   A, B : 10 미만의 자연수
#
# 출력
#   A/B 의 값, 절대오차나 상대오차가 10^-9 이하여야함.
#

import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())

print(f"{A / B}")

