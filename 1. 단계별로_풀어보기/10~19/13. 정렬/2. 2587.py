import sys

input = sys.stdin.readline
output = sys.stdout.write

numArr = list(int(input()) for i in range(5))

numArr.sort()

middle = numArr[2]
average = sum(numArr) // 5

output(f"{average}\n{middle}")