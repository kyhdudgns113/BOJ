import sys

input = sys.stdin.readline
output = sys.stdout.write

numArr = list(int(input()) for i in range(9))

maxNum = max(numArr)
maxNumIdx = numArr.index(maxNum) + 1

output(f"{maxNum}\n{maxNumIdx}")