# pypy 로 해야 돌아간다
# python 으로 하면 시간초과

import sys

input = sys.stdin.readline
output = sys.stdout.write

board = list(list(map(int, input().split())) for i in range(9))

entireZero = sum(row.count(0) for row in board)

isFound = False

def recurse(nowRow, nowCol, filledZero):
  global isFound
  
  isOK = [True] * 10
  
  for col in range(9):
    isOK[board[nowRow][col]] = False
  
  for row in range(9):
    isOK[board[row][nowCol]] = False
  
  rowStart = 3 * (nowRow // 3)
  colStart = 3 * (nowCol // 3)
  
  for row in range(rowStart, rowStart + 3):
    for col in range(colStart, colStart + 3):
      isOK[board[row][col]] = False
  
  for val in range(1, 10):
    if isOK[val]:
      board[nowRow][nowCol] = val
      
      if filledZero == entireZero:
        isFound = True
        return
      
      if isFound:
        return
      
      foundNext = False
      for nextRow in range(nowRow, 9):
        for nextCol in range(nowCol + 1 if nextRow == nowRow else 0, 9):
          if board[nextRow][nextCol] == 0:
            foundNext = True
            recurse(nextRow, nextCol, filledZero + 1)
            if isFound:
              return
            break
        if foundNext:
          break
      
      if not isFound:
        board[nowRow][nowCol] = 0

row = 0
col = 0

for row in range(9):
  for col in range(9):
    if board[row][col] == 0:
      recurse(row, col, 1)
      break
  
  if col < 9:
    break

resultStr = ''

for row in board:
  resultStr += ' '.join(map(str, row)) + '\n'

output(resultStr)