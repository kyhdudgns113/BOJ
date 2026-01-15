import math, sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(int(input()) for i in range(N))

cntArr = [0] * 8001

for num in numArr:
  cntArr[num] += 1

numArr.sort()

freqArr = list(i for i in range(-4000, 4001) if cntArr[i] == max(cntArr))

average = round(sum(numArr) / N)
center = numArr[math.floor(N / 2)]
freqNum = freqArr[1] if len(freqArr) > 1 else freqArr[0]
minMax = numArr[-1] - numArr[0]

output(f"{average}\n{center}\n{freqNum}\n{minMax}")