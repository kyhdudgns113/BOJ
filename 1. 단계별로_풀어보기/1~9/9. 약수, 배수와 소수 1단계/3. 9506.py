import math, sys
from collections import deque

input = sys.stdin.readline
output = sys.stdout.write

while True:
  N = int(input())

  if N == -1:
    break

  sums = 0
  ascDeque = deque()
  descDeque = deque()

  maxIter = math.floor(math.sqrt(N))

  for i in range(1, maxIter + 1):
    if N % i == 0:
      ascDeque.append(i)
      sums += i

      div = N // i

      if div != N and div != i:
        descDeque.appendleft(div)
        sums += div

  if sums == N:
    output(f"{N} = ")

    while len(ascDeque) > 0:
      val = ascDeque.popleft()
      output(f"{val} ")
      if len(descDeque) > 0:
        output(f"+ ")

    while len(descDeque) > 0:
      val = descDeque.popleft()
      output(f"{val} ")
      if len(descDeque) > 0:
        output(f"+ ")
    
    output("\n")
  else:
    output(f"{N} is NOT perfect.\n")

  