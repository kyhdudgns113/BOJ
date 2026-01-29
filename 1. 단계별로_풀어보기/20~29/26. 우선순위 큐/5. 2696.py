from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

for _ in range(T):
  M = int(input())
  numArr = list(x for _ in range((M + 9) // 10) for x in map(int, input().split()))

  smallQ = PriorityQueue()
  bigQ = PriorityQueue()

  isEnter = 0

  output(f"{(M + 1) // 2}\n")

  for idx, num in enumerate(numArr):
    if idx == 0:
      smallQ.put(-num)
      output(f"{num} ")
      isEnter += 1
      continue
    elif idx == 1:
      prevVal = -smallQ.get()
      smallQ.put(-min(prevVal, num))
      bigQ.put(max(prevVal, num))
      continue

    midVal = num
    smallVal = -smallQ.get()
    bigVal = bigQ.get()

    if num < smallVal:
      midVal = smallVal
      smallVal = num
    elif bigVal < num:
      midVal = bigVal
      bigVal = num

    smallQ.put(-smallVal)
    bigQ.put(bigVal)

    if idx % 2 == 0:
      smallQ.put(-midVal)
      if isEnter % 10 == 0:
        output(f"\n")
      output(f"{midVal} ")
      isEnter += 1
    else:
      bigQ.put(midVal)
  
  output(f"\n")
