import sys

input = sys.stdin.readline
output = sys.stdout.write

inputArr = list(list(input().strip().split(' ')) for i in range(20))

sumMother = 0
sumSon = 0

scoreMap = {
  'A+': 4.5,
  'A0': 4.0,
  'B+': 3.5,
  'B0': 3.0,
  'C+': 2.5,
  'C0': 2.0,
  'D+': 1.5,
  'D0': 1.0,
  'F': 0
}

for input in inputArr:
  title, mother, son = input

  if son != 'P':
    sumMother += float(mother)
    sumSon += float(mother) * scoreMap[son]

output(f"{sumSon / sumMother}")