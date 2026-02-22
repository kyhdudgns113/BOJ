import sys

sys.setrecursionlimit(200000)

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

unionMap = {}
numMemMap = {}

def getUnion(val):
  if unionMap[val] == val:
    return val

  unionMap[val] = getUnion(unionMap[val])

  return unionMap[val]

def joinUnion(a, b):
  smaller = min(a, b)
  bigger = max(a, b)

  smallerUnion = getUnion(smaller)
  biggerUnion = getUnion(bigger)

  if smallerUnion != biggerUnion:
    unionMap[biggerUnion] = smallerUnion
    numMemMap[smallerUnion] += numMemMap[biggerUnion]
  
  return numMemMap[smallerUnion]

for t in range(T):
  F = int(input())

  unionMap = {}
  numMemMap = {}

  for f in range(F):
    A, B = input().strip().split()

    if not A in unionMap:
      unionMap[A] = A
      numMemMap[A] = 1
    
    if not B in unionMap:
      unionMap[B] = B
      numMemMap[B] = 1

    output(f"{joinUnion(A, B)}\n")