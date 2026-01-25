import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
cardArr = list(map(int, input().split()))
Q = int(input())
queryArr = list(map(int, input().split()))

cardMap = {}

for card in cardArr:
  if card in cardMap:
    cardMap[card] += 1
  else:
    cardMap[card] = 1

for query in queryArr:
  output(f"{cardMap[query] if query in cardMap else 0} ")