# 1-3. 1001. A-B
#
# 입력
#  A, B: 10 미만의 자연수
#
# 출력
#  A - B

import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())

print(A - B)