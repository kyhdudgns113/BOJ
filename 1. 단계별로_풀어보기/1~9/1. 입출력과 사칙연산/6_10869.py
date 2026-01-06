#
# 1-5. 10869 사칙연산
#
# 입력
#   A, B: 10,000 이하의 자연수
#
# 출력
#   A + B
#   A - B
#   A * B
#   A / B (몫만 출력한다.)
#   A % B
#   각각 한 줄로 출력한다.
#

import sys
import math

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())

output(f"{A + B}\n")
output(f"{A - B}\n")
output(f"{A * B}\n")
output(f"{math.floor(A / B)}\n")
output(f"{A % B}\n")