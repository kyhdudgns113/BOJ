import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

wordArr = list(input().strip() for i in range(N))

result = N

for word in wordArr:
  charArr = list(word.strip())
  cntArr = [0] * 26

  for charIdx, char in enumerate(charArr):
    cntIdx = ord(char) - ord('a')
    if charIdx > 0 and char != charArr[charIdx - 1] and cntArr[cntIdx] > 0:
      result -= 1
      break

    cntArr[cntIdx] += 1
 
output(f"{result}")  

