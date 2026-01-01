# 1-1. 2557. Hello World
# print("Hello World!") 한 줄로 짤 수도 있긴 하다.
# 나중에는 빠른 입출력을 요하는 문제들도 있다.
# 미리 연습한다는 느낌으로 sys 라이브러리를 사용한다.

import sys

input = sys.stdin.readline
output = sys.stdout.write

output("Hello World!")