"""
app.py — COMPLETE Python CORE (Working)
No frameworks. No web. No external libs.
"""

print("===== PYTHON CORE START =====")

# ===============================
# 1. VARIABLES & DATA TYPES
# ===============================
name = "Alice"
age = 30
active = True
nothing = None
big = 12345678901234567890

print(name, age, active, nothing, big)

# ===============================
# 2. TYPE CHECKING
# ===============================
print(type(name), isinstance(age, int))

# ===============================
# 3. STRINGS
# ===============================
text = " Hello World "
print(text.strip().upper())
print(f"User: {name}, Age: {age}")

# ===============================
# 4. OPERATORS
# ===============================
total = 10 + 5
power = 2 ** 3
status = "High" if total > 10 else "Low"
print(total, power, status)

# ===============================
# 5. CONTROL FLOW
# ===============================
if age >= 18:
    print("Adult")
else:
    print("Minor")

for i in range(3):
    print("For:", i)

# ===============================
# 6. FUNCTIONS
# ===============================
def greet(user):
    return "Hello " + user

add = lambda a, b: a + b

print(greet("Bob"), add(2, 3))

# ===============================
# 7. LISTS
# ===============================
numbers = [1, 2, 3]
numbers.append(4)

doubled = [n * 2 for n in numbers]
filtered = [n for n in numbers if n > 2]
total_sum = sum(numbers)

print(numbers, doubled, filtered, total_sum)

# ===============================
# 8. DICTIONARIES
# ===============================
user = {
    "id": 1,
    "name": "Alice"
}

user["city"] = "Delhi"
del user["id"]

print(user)

# ===============================
# 9. UNPACKING
# ===============================
username = user["name"]
print(username)

# ===============================
# 10. SET & TUPLE
# ===============================
unique = {1, 2, 2, 3}
unique.add(4)

point = (10, 20)
x, y = point

print(unique, x, y)

# ===============================
# 11. DATE & MATH
# ===============================
from datetime import datetime
import math

now = datetime.now()
print(now.isoformat(), math.sqrt(16))

# ===============================
# 12. JSON
# ===============================
import json

json_data = json.dumps(user)
parsed = json.loads(json_data)
print(parsed)

# ===============================
# 13. ERROR HANDLING
# ===============================
try:
    raise Exception("Test error")
except Exception as e:
    print("Caught:", e)
finally:
    print("Finally block executed")

# ===============================
# 14. FILE HANDLING
# ===============================
with open("data.txt", "w") as f:
    f.write("Hello Python")

with open("data.txt") as f:
    print("File:", f.read())

# ===============================
# 15. CLASSES & OOP
# ===============================
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi {self.name}"

class Employee(Person):
    pass

emp = Employee("Charlie")
print(emp.greet())

# ===============================
# 16. GENERATOR
# ===============================
def generator():
    yield 1
    yield 2

for val in generator():
    print("Yield:", val)

# ===============================
# 17. THREADING (BASIC)
# ===============================
import threading
import time

def task():
    time.sleep(0.5)
    print("Thread done")

t = threading.Thread(target=task)
t.start()
t.join()

print("===== PYTHON CORE END =====")
