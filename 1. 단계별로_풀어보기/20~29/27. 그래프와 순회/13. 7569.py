import sys
from collections import deque

# 입력
input_arr = sys.stdin.read().strip().split('\n')

# 입력 파싱
M, N, H = map(int, input_arr[0].split())
box = [[list(map(int, input_arr[1 + h * N + n].split())) for n in range(N)] for h in range(H)]

# 몇번째로 방문했는지 저장할 배열
# 방문 안했으면 -1로 한다
is_visit = [[[-1] * M for _ in range(N)] for _ in range(H)]

# BFS 용 방문큐
visit_queue = deque()
remain_space = H * N * M

# 익은 토마토, 빈공간은 0번째로 익었다고 간주한다.
for h in range(H):
    for n in range(N):
        for m in range(M):
            if box[h][n][m] == -1:
                remain_space -= 1
                is_visit[h][n][m] = 0
            elif box[h][n][m] == 1:
                is_visit[h][n][m] = 0
                visit_queue.append([h, n, m])

result = 0

# BFS 연산 수행
while visit_queue:
    now_h, now_n, now_m = visit_queue.popleft()
    now_val = is_visit[now_h][now_n][now_m]

    remain_space -= 1

    result = max(result, now_val)

    # 아래쪽 층
    if now_h > 0 and box[now_h - 1][now_n][now_m] == 0 and is_visit[now_h - 1][now_n][now_m] == -1:
        is_visit[now_h - 1][now_n][now_m] = now_val + 1
        visit_queue.append([now_h - 1, now_n, now_m])
    # 위쪽 층
    if now_h < H - 1 and box[now_h + 1][now_n][now_m] == 0 and is_visit[now_h + 1][now_n][now_m] == -1:
        is_visit[now_h + 1][now_n][now_m] = now_val + 1
        visit_queue.append([now_h + 1, now_n, now_m])
    # 뒤쪽 (n 감소)
    if now_n > 0 and box[now_h][now_n - 1][now_m] == 0 and is_visit[now_h][now_n - 1][now_m] == -1:
        is_visit[now_h][now_n - 1][now_m] = now_val + 1
        visit_queue.append([now_h, now_n - 1, now_m])
    # 앞쪽 (n 증가)
    if now_n < N - 1 and box[now_h][now_n + 1][now_m] == 0 and is_visit[now_h][now_n + 1][now_m] == -1:
        is_visit[now_h][now_n + 1][now_m] = now_val + 1
        visit_queue.append([now_h, now_n + 1, now_m])
    # 왼쪽 (m 감소)
    if now_m > 0 and box[now_h][now_n][now_m - 1] == 0 and is_visit[now_h][now_n][now_m - 1] == -1:
        is_visit[now_h][now_n][now_m - 1] = now_val + 1
        visit_queue.append([now_h, now_n, now_m - 1])
    # 오른쪽 (m 증가)
    if now_m < M - 1 and box[now_h][now_n][now_m + 1] == 0 and is_visit[now_h][now_n][now_m + 1] == -1:
        is_visit[now_h][now_n][now_m + 1] = now_val + 1
        visit_queue.append([now_h, now_n, now_m + 1])

if remain_space > 0:
    print(-1)
else:
    print(result)
