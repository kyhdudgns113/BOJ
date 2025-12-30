import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

# 마름모 윗부분 출력
for i in range(N):
  # 공백 출력
  output(f"{' ' * (N - i - 1)}")

  # 별 출력
  output(f"{'*' * (2 * i + 1)}\n")

# 마름모 아랫부분 출력
for i in range(N - 1):
  # 공백 출력
  output(f"{' ' * (i + 1)}")

  # 별 출력
  output(f"{'*' * (2 * N - 2 * i - 3)}")

  # 경우에 따른 개행 출력
  if i != N - 2:
    output('\n')