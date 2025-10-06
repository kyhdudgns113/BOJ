import sys

input = sys.stdin.readline
output = sys.stdout.write

nums = [int(input()) for i in range(10)]

results = [0 for i in range(42)]

for num in nums:
  results[num % 42] = 1

output(f"{results.count(1)}")