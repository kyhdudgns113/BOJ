from functools import cmp_to_key
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
wordArr = list(input().strip() for i in range(N))

filteredWordArr = list(word for word in wordArr if len(word) >= M)

cntMap = {}

def cmp(a: str, b: str):
  if cntMap[a] != cntMap[b]:
    return cntMap[b] - cntMap[a]
  elif len(a) != len(b):
    return len(b) - len(a)
  else:
    return 1 if a > b else -1

for word in filteredWordArr:
  try:
    cntMap[word] += 1
  except:
    cntMap[word] = 1

# 중복 제거한 단어 배열
wordSetArr = list(cntMap.keys())

wordSetArr.sort(key=cmp_to_key(cmp))

for word in wordSetArr:
  output(f"{word}\n")

