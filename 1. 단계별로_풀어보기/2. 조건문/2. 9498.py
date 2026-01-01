import sys

input = sys.stdin.readline
output = sys.stdout.write

score = int(input())

scoreDiv10 = score // 10

if scoreDiv10 >= 9:
  output(f"A")
elif scoreDiv10 >= 8:
  output(f"B")
elif scoreDiv10 >= 7:
  output(f"C")
elif scoreDiv10 >= 6:
  output(f"D")
else:
  output(f"F")