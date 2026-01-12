import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
cardArr = list(map(int, input().split()))
M = int(input())
testArr = list(map(int, input().split()))

cardSet = set(cardArr)

for card in testArr:
  output(f"{1 if card in cardSet else 0} ")