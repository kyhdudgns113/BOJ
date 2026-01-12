import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
cardArr = list(map(int, input().split()))
M = int(input())
queryArr = list(map(int, input().split()))

cntArr = [0] * 20000005

for card in cardArr:
  cntArr[card] += 1

for query in queryArr:
  try:
    output(f"{cntArr[query]} ")
  except:
    output(f"0 ")