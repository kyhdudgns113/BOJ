import sys

sys.setrecursionlimit(3 * (10 ** 5))

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(map(int, input().split()))

accArr = [0] * (N + 1)
minAcc = [100000001] * (N + 1)

# accArr 와 minAcc 를 구하는걸 recursion 으로 할 수 없다.
#   Python3 은 시간초과
#   Pypy3 는 메모리초과
for i in range(1, N + 1):
  accArr[i] = accArr[i - 1] + numArr[i - 1]
  minAcc[i] = min(minAcc[i - 1], accArr[i - 1])

def getResult(n):
  if n == 1:
    return accArr[n] - minAcc[n]
  
  return max(accArr[n] - minAcc[n], getResult(n - 1))

output(f"{getResult(N)}")