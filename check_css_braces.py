import os

file_path = 'src/styles/global.css'

if not os.path.exists(file_path):
    print(f"Error: File not found at {file_path}")
    exit(1)

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    stack = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        for char in line:
            if char == '{':
                stack.append(line_num)
            elif char == '}':
                if not stack:
                    print(f"Error: Too many closing braces at line {line_num}")
                    exit(1)
                stack.pop()

    if stack:
        print(f"Error: Unclosed braces at end of file. Count: {len(stack)}")
        print(f"Unclosed braces stack (line numbers): {stack}")
    else:
        print("Success: Braces are balanced.")

except Exception as e:
    print(f"An error occurred: {e}")
