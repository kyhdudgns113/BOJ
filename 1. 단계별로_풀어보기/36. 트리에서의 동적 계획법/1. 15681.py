import sys

sys.setrecursionlimit(200000)

input = sys.stdin.readline
output = sys.stdout.write

N, R, Q = map(int, input().split())
UVArr = list(list(map(int, input().split())) for i in range(N - 1))
queryArr = list(int(input()) for i in range(Q)) 

connInfoArr = list([] for i in range(N + 1))
numChilds = list(0 for i in range(N + 1))
parentArr = list(-1 for i in range(N + 1))

#############################
#      사용할 함수 영역       #
#############################

def DFS(now):
  numChilds[now] = 1

  for next in connInfoArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      numChilds[now] += DFS(next)

  return numChilds[now]

##########################
#      문제풀이 영역       #
##########################

for U, V in UVArr:
  connInfoArr[U].append(V)
  connInfoArr[V].append(U)

parentArr[R] = 0
DFS(R)

for query in queryArr:
  output(f"{numChilds[query]}\n")
