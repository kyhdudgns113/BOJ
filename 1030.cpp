#pragma warning(disable:4244)
#include <iostream>
#include <math.h>

using namespace std;

int s, n, k, r1, r2, c1, c2;

int isOne(int r, int c, int rmin, int rmax, int cmin, int cmax, int _s);

int main() {

	cin >> s >> n >> k >> r1 >> r2 >> c1 >> c2;

	int rmin = 0, rmax = pow(n, s) - 1;
	int cmin = 0, cmax = rmax;

	for (int i = r1; i <= r2; i++) {
		for (int j = c1; j <= c2; j++)
			printf("%d", isOne(i, j, rmin, rmax, cmin, cmax, s));
		printf("\n");
	}
}

//
//	1. �� ���� ���ؼ� 0���� 1���� �Ǵ��Ѵ�.
//	2. �־��� ������ n*n ���� �������� ������.
//	3. �� �߿��� ����� k*k ������ �ִ��� �Ǵ��Ѵ�.
//		3.1 �׷��ٸ� 1�� �����Ѵ�.
//	4. �װ� �ƴ϶�� �� ���� ���ԵǾ��ִ� ������ ���ο� �������� �Ͽ� 2���� �ݺ��Ѵ�.
//
int isOne(int r, int c, int rmin, int rmax, int cmin, int cmax, int _s) {
	int block_size = (rmax - rmin+1) / n;
	
	int idx_r = 100, idx_c = 100, i;

	for (i = 0; i < n; i++) {
		if (rmin + i * block_size <= r && r < rmin + (i + 1) * block_size)
			idx_r = min(idx_r, i);
		if (cmin + i * block_size <= c && c < cmin + (i + 1) * block_size)
			idx_c = min(idx_c, i);
	}

	if ((n - k) / 2 <= idx_r && idx_r < (n + k) / 2 &&
		(n - k) / 2 <= idx_c && idx_c < (n + k) / 2)
		return 1;

	if (_s == 1)
		return 0;

	return isOne(r, c, rmin + idx_r * block_size, rmin + (idx_r + 1) * block_size - 1, cmin + idx_c * block_size, cmin + (idx_c + 1) * block_size - 1, _s - 1);
}