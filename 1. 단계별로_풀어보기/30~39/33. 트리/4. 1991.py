import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
childArr = list([None, None] for i in range(256))

def VLR(now):
  result = chr(now)
  lc, rc = childArr[now]

  if lc:
    result += VLR(lc)
  if rc:
    result += VLR(rc)
  return result

def LVR(now):
  result = chr(now)
  lc, rc = childArr[now]

  if lc:
    result = LVR(lc) + result
  if rc:
    result += LVR(rc)
  return result

def LRV(now):
  result = ''
  lc, rc = childArr[now]

  if lc:
    result += LRV(lc)
  if rc:
    result += LRV(rc)
  
  result += chr(now)
  return result

asciiA = ord('A')
asciiZ = ord('Z')

for _ in range(N):
  parent, lc, rc = input().split()

  if asciiA <= ord(lc) <= asciiZ:
    childArr[ord(parent)][0] = ord(lc)
  if asciiA <= ord(rc) <= asciiZ:
    childArr[ord(parent)][1] = ord(rc)

output(f"{VLR(asciiA)}\n")
output(f"{LVR(asciiA)}\n")
output(f"{LRV(asciiA)}\n")



  
