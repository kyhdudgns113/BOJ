import math
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

pokeArr = list(input().strip() for i in range(N))
queryArr = list(input().strip() for i in range(M))

pokeDict = {}

for i in range(N):
  pokeDict[pokeArr[i]] = i + 1

for query in queryArr:
  if query.isdigit():
    output(f"{pokeArr[int(query) - 1]}\n")
  else:
    output(f"{pokeDict[query]}\n")