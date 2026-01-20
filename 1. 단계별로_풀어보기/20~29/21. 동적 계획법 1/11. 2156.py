import sys

sys.setrecursionlimit(2 * 2 * 10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input()) 
wineArr = list(int(input()) for i in range(N))

resultArr = [[None, None] for i in range(N)]

resultArr[0][0] = 0
resultArr[0][1] = wineArr[0]
if N > 1:
  resultArr[1][1] = wineArr[1]
  resultArr[1][0] = wineArr[0] + wineArr[1]

def getResult(nowWine, isSkip):
  if resultArr[nowWine][isSkip] != None:
    return resultArr[nowWine][isSkip]

  if isSkip == 0:
    resultArr[nowWine][isSkip] = getResult(nowWine - 1, 1) + wineArr[nowWine]
  else:
    maxVal = 0 

    if nowWine >= 2:
      maxVal = max(maxVal, getResult(nowWine - 2, 0), getResult(nowWine - 2, 1))
    
    if nowWine >= 3:
      maxVal = max(maxVal, getResult(nowWine - 3, 0), getResult(nowWine - 3, 1))

    maxVal += wineArr[nowWine]
    resultArr[nowWine][isSkip] = maxVal
  
  return resultArr[nowWine][isSkip]

result = max(getResult(N - 1, 0), getResult(N - 1, 1))

if N > 1:
  result = max(result, getResult(N - 2, 0))

output(f"{result}")