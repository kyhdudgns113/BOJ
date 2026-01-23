import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

fibMap = {}

fibMap[0] = 0
fibMap[1] = 1
fibMap[2] = 1
fibMap[3] = 2
fibMap[4] = 3

def getFibonacci(n):
  if n in fibMap:
    return fibMap[n]

  half = n // 2

  if n % 2 == 0:
    n0 = getFibonacci(half)
    n1 = getFibonacci(half - 1)
    fibMap[n] = n0 * (n0 + 2 * n1) % 1000000007
  else:
    n0 = getFibonacci(half)
    n1 = getFibonacci(half + 1)
    fibMap[n] = (n1 * n1 + n0 * n0) % 1000000007

  return fibMap[n]

output(f"{getFibonacci(N)}")
