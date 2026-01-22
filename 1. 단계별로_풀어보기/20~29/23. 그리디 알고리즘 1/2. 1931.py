import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
confArr = list(list(map(int, input().split())) for i in range(N))

confArr.sort(key=lambda x: (x[1], -x[0]))

result = 0
lastStart = -1
lastEnd = -1

for conf in confArr:
  nowStart, nowEnd = conf

  isOver = lastEnd <= nowStart
  isLastSame = lastEnd == nowEnd and lastStart == lastEnd

  if isOver or isLastSame:
    lastStart = nowStart
    lastEnd = nowEnd
    result += 1

output(f"{result}")