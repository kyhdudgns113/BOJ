import sys

input = sys.stdin.readline
output = sys.stdout.write

# 입력 파싱
N, K = map(int, input().split())

# resultArr[c] : c 를 만들 수 있는 경우의 수
resultArr = [0] * (K + 1)

# 초기조건: 동전을 아예 안쓰고 0원을 만드는 방법은 1개가 있다. 아예 안쓰는것
resultArr[0] = 1

for i in range(N):
  coin = int(input())
  for c in range(K - coin + 1):
    resultArr[c + coin] += resultArr[c]

# 결과 출력
output(f"{resultArr[K]}")
