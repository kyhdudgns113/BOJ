from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())
gemArr = list(list(map(int, input().split())) for i in range(N))
bagArr = list(int(input()) for i in range(K))

# 무게가 낮은것 순으로 정렬한다.
gemArr.sort()
bagArr.sort()

# 담을 수 있는 보석중 가치가 가장 높은걸 꺼내기 위한 PQ
availGemPQ = PriorityQueue()

def getPriorityGem(gem):
  return [-gem[1], -gem[0]]

def getGemValFromPriority(pri):
  return -pri[0]

# PQ 에 넣을지 판단할 보석의 인덱스
idxGem = 0

# 결과값
result = 0

for bag in bagArr:
  # 각 가방마다 담을 수 있는 보석들을 PQ 에 넣는다.
  for i in range(idxGem, N):
    gem = gemArr[i]
    # 보석이 더 무거우면 
    if gem[0] > bag:
      break
      
    idxGem = i + 1
    availGemPQ.put(getPriorityGem(gem))
  
  # 담을 수 있는 보석중에서 가장 가치가 높은걸 꺼낸다.
  if not availGemPQ.empty():
    gemVal = getGemValFromPriority(availGemPQ.get())
    result += gemVal

output(f"{result}")