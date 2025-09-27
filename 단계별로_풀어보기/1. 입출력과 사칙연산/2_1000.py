# 1-2. 1000. A+B
#
# 두 수를 더한 값을 출력하는 문제이다.
# 빠른 출력을 위해 output 에 f 로 포매팅을 해줬다.

import sys

input = sys.stdin.readline
output = sys.stdout.write

A, B = map(int, input().split())

output(f"{A + B}")