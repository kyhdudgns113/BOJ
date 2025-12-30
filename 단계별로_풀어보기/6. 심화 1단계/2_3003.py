import sys

input = sys.stdin.readline
output = sys.stdout.write

inputArr = list(map(int, input().strip().split()))

targetArr = [1, 1, 2, 2, 2, 8]

resultArr = [(targetArr[i] - inputArr[i]) for i in range(6)]

output(f"{' '.join(str(res) for res in resultArr)}")