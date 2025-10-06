import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

resultArr = [i + 1 for i in range(N)]

for idx in range(M):
  i, j = map(int, input().split())
  resultArr[i - 1], resultArr[j - 1] = resultArr[j - 1], resultArr[i - 1]

output(f"{" ".join(str(x) for x in resultArr)}")