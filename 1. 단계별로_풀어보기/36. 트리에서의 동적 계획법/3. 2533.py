import sys

sys.setrecursionlimit(1000000)

input = sys.stdin.readline
output = sys.stdout.write

#######################
#      입력 영역       #
#######################

N = int(input())
connArr = list([] for i in range(N + 1))

for _ in range(N - 1):
  U, V = map(int, input().split())
  connArr[U].append(V)
  connArr[V].append(U)

###############################
#      기타 자료구조 영역       #
###############################

ROOT_NODE = 1
parentArr = list(-1 for i in range(N + 1))
parentArr[ROOT_NODE] = 0

#############################
#      사용할 함수 영역       #
#############################

def DFS(now):
  nowO = 1
  nowX = 0

  for next in connArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      O, X = DFS(next)
      nowO += min(O, X)
      nowX += O

  return [nowO, nowX]

#######################
#      출력 영역       #
#######################

O, X = DFS(ROOT_NODE)

output(f"{min(O, X)}")