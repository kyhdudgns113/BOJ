import sys
import math

input = sys.stdin.readline
output = sys.stdout.write

num1 = int(input())
num2 = int(input())

num2_1 = num2 % 10
num2_10 = (num2 // 10) % 10
num2_100 = num2 // 100

output(f"{num1 * num2_1}\n")
output(f"{num1 * num2_10}\n")
output(f"{num1 * num2_100}\n")
output(f"{num1 * num2}\n")