import sys

input = sys.stdin.readline
output = sys.stdout.write

inputArr = sys.stdin.read().strip().split('\n')

numArr = list(map(int, inputArr[1].strip().split()))
queryArr = list(map(int, inputArr[3].strip().split()))

numMap = {}
for num in numArr:
  numMap[num] = 1

resultStr = ''
for query in queryArr:
  resultStr += str(1 if query in numMap else 0) + '\n'

output(resultStr)
