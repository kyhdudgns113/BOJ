from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())

remainQueue = deque(i + 1 for i in range(N))
resultQueue = deque()

for i in range(N):
  # 건너뛸 사람 건너뛰기
  for j in range(K - 1):
    remainQueue.append(remainQueue.popleft())
  
  # 죽이기
  resultQueue.append(remainQueue.popleft())

output(f"<{", ".join(map(str, resultQueue))}>")
