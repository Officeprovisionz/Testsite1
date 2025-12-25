import os

filename = 'src/styles/global.css'

if not os.path.exists(filename):
    print(f"Error: File {filename} not found.")
    exit(1)

try:
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
except Exception as e:
    print(f"Error reading file: {e}")
    exit(1)

stack = []
balance = 0

for i, line in enumerate(lines):
    line_num = i + 1
    for char in line:
        if char == '{':
            stack.append(line_num)
            balance += 1
        elif char == '}':
            if balance == 0:
                print(f"Error: Too many closing braces at line {line_num}")
                exit(1)
            stack.pop()
            balance -= 1

if balance > 0:
    print(f"Error: Unclosed braces. Final balance: {balance}")
    print(f"Stack of unclosed braces (line numbers): {stack}")
else:
    print("Braces are balanced.")
