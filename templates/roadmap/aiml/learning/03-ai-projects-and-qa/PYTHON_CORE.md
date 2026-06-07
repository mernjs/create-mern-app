# **Python Questions & Answers**

---

## **SECTION 1: Python Fundamentals (Q1–15)**

### **Q1. What is Python? Explain its key characteristics.**

**Answer:**
Python is a **high-level, interpreted, dynamically typed, and object-oriented** programming language.
It focuses on **code readability and developer productivity**.

Key characteristics:

* **Interpreted:** Code runs line by line
* **Dynamically typed:** No need to declare variable types
* **Garbage collected:** Automatic memory management
* **Cross-platform:** Same code runs on Windows, Linux, macOS
* **Extensive standard library:** Reduces external dependencies

---

### **Q2. Why is Python called an interpreted language?**

**Answer:**
Python code is executed by an interpreter rather than compiled directly into machine code.

Internally:

1. Python source (`.py`) → compiled into **bytecode**
2. Bytecode executed by **Python Virtual Machine (PVM)**

So Python is **both compiled and interpreted**, but compilation is hidden from the user.

---

### **Q3. What is dynamically typed language?**

**Answer:**
In Python, the **type is associated with the object, not the variable**.

```python
x = 10
x = "hello"
```

Here, `x` is just a reference.
This allows flexibility but requires discipline to avoid runtime errors.

---

### **Q4. What are the advantages and disadvantages of dynamic typing?**

**Answer:**

**Advantages**

* Faster development
* Less boilerplate
* Easier prototyping

**Disadvantages**

* Runtime type errors
* Harder to maintain large codebases

This is why **type hints** are recommended in production.

---

### **Q5. What are Python keywords?**

**Answer:**
Keywords are **reserved words** with predefined meaning and cannot be used as variable names.

Examples:
`if`, `else`, `for`, `while`, `def`, `class`, `try`, `except`

---

### **Q6. What is PEP 8 and why is it important?**

**Answer:**
PEP 8 is Python’s **official style guide**.

It improves:

* Code readability
* Team collaboration
* Maintainability

Example:

```python
# Recommended
total_count = 10
```

---

### **Q7. What is indentation in Python and why is it required?**

**Answer:**
Indentation defines **code blocks** in Python instead of braces `{}`.

```python
if x > 0:
    print("Positive")
```

Incorrect indentation causes `IndentationError`.

---

### **Q8. What is None in Python?**

**Answer:**
`None` represents **absence of a value**.
It is not `0`, not `False`, and not empty.

Common use cases:

* Default function return
* Placeholder variable
* Optional values

---

### **Q9. Difference between `==` and `is`**

**Answer:**

* `==` → compares **values**
* `is` → compares **memory reference**

```python
a = [1, 2]
b = [1, 2]
a == b  # True
a is b  # False
```

---

### **Q10. What is Python memory management?**

**Answer:**
Python uses:

* **Reference counting**
* **Garbage collection** for cyclic references

Memory is automatically freed when object reference count becomes zero.

---

### **Q11. What is garbage collection?**

**Answer:**
Garbage collection removes **unused objects** from memory to prevent leaks.

Python GC mainly handles **circular references**.

---

### **Q12. What is pass statement?**

**Answer:**
`pass` is a **null operation** used as a placeholder.

```python
def future_function():
    pass
```

---

### **Q13. What are Python built-in data types?**

**Answer:**

* Numeric: `int`, `float`
* Sequence: `list`, `tuple`, `str`
* Set: `set`
* Mapping: `dict`
* Boolean: `bool`

---

### **Q14. What is mutable vs immutable?**

**Answer:**

* **Mutable:** Can change in place (list, dict, set)
* **Immutable:** Cannot change (int, tuple, str)

Immutability improves safety and performance.

---

### **Q15. What happens when you modify an immutable object?**

**Answer:**
A **new object is created in memory**.

```python
x = 10
x += 1  # new object
```

---

## **SECTION 2: Data Structures (Q16–35)**

### **Q16. What is a list?**

**Answer:**
List is an **ordered, mutable collection** that allows duplicates.

Use case:

* When data changes frequently

---

### **Q17. What is a tuple?**

**Answer:**
Tuple is an **ordered, immutable collection**.

Use case:

* Fixed data
* Dictionary keys
* Performance optimization

---

### **Q18. List vs Tuple (Real-world explanation)**

**Answer:**
Use list for **data that changes**
Use tuple for **configuration or constants**

---

### **Q19. What is dictionary?**

**Answer:**
Dictionary stores **key–value pairs** with O(1) lookup.

```python
user = {"id": 1, "name": "Vijay"}
```

---

### **Q20. What is set?**

**Answer:**
Unordered collection of **unique elements**.

Use case:

* Removing duplicates
* Membership testing

---

## **Q21. What is slicing?**

**Detailed Answer:**
Slicing is used to **extract a portion of a sequence** (list, tuple, string) without modifying the original object.

**Syntax:**

```python
sequence[start : end : step]
```

* `start` → starting index (inclusive)
* `end` → ending index (exclusive)
* `step` → jump size

```python
a = [0, 1, 2, 3, 4, 5, 6]
a[1:5:2]   # [1, 3]
```

**Key points interviewers like:**

* Returns a **new object**
* Safe (no index error)
* Works with negative indices

---

## **Q22. What is list comprehension?**

**Detailed Answer:**
List comprehension is a **compact and readable way to create lists** using expressions and loops in a single line.

```python
squares = [x * x for x in range(5)]
```

**Why it’s preferred:**

* More readable
* Faster than traditional loops
* Pythonic

**With condition:**

```python
[x for x in range(10) if x % 2 == 0]
```

---

## **Q23. What is shallow vs deep copy?**

**Detailed Answer:**

### **Shallow Copy**

* Copies the **reference**, not nested objects
* Changes in nested objects affect both copies

```python
import copy
a = [[1, 2], [3, 4]]
b = copy.copy(a)
```

### **Deep Copy**

* Copies **entire object tree**
* Fully independent copy

```python
b = copy.deepcopy(a)
```

**When asked in interviews:**
Say → *“Use deep copy when working with nested mutable objects.”*

---

## **Q24. What is unpacking?**

**Detailed Answer:**
Unpacking assigns elements of an iterable to variables in a **single statement**.

```python
a, b = [1, 2]
```

**Extended unpacking:**

```python
a, *rest = [1, 2, 3, 4]
```

Used heavily in:

* Function returns
* Swapping variables
* Clean code patterns

---

## **Q25. What is enumerate()?**

**Detailed Answer:**
`enumerate()` returns **index and value together**, improving readability.

```python
for index, value in enumerate(["a", "b", "c"]):
    print(index, value)
```

**Why interviewers like it:**

* Avoids manual counter variables
* Cleaner and safer loops

---

## **Q26. What is zip()?**

**Detailed Answer:**
`zip()` combines multiple iterables **element by element**.

```python
names = ["A", "B"]
scores = [90, 80]

list(zip(names, scores))
```

Output:

```python
[("A", 90), ("B", 80)]
```

Stops at the **shortest iterable**.

---

## **Q27. What is any() and all()?**

**Detailed Answer:**

* `any()` → True if **at least one** element is truthy
* `all()` → True if **all** elements are truthy

```python
any([0, False, 1])  # True
all([1, True, 0])   # False
```

Used for:

* Validation
* Permission checks
* Data sanity checks

---

## **Q28. What is range()?**

**Detailed Answer:**
`range()` generates numbers **lazily**, meaning it does not store all values in memory.

```python
range(0, 10, 2)
```

Why important:

* Memory efficient
* Used in loops

---

## **Q29. What is del keyword?**

**Detailed Answer:**
`del` removes a **reference**, not the object itself.

```python
a = [1, 2, 3]
del a[0]
```

Memory is freed **only when reference count becomes zero**.

---

## **Q30. Why dictionaries are fast?**

**Detailed Answer:**
Dictionaries use **hash tables**, allowing:

* Average O(1) lookup
* Fast insert and delete

Keys are hashed → mapped directly to memory locations.

---

## **Q31. What is dictionary collision?**

**Detailed Answer:**
Occurs when **two keys generate the same hash value**.

Python still stores both but resolves collision internally.

---

## **Q32. How Python handles collisions?**

**Detailed Answer:**
Python uses **open addressing**:

* Probes for next available slot
* Avoids linked lists

This improves cache performance.

---

## **Q33. What is frozenset?**

**Detailed Answer:**
Immutable version of set.

```python
fs = frozenset([1, 2, 3])
```

Use cases:

* Dictionary keys
* Safer set operations

---

## **Q34. Why strings are immutable?**

**Detailed Answer:**

* Memory optimization
* Security
* Hashability (used as dict keys)

Changing a string creates a **new object**.

---

## **Q35. When to use set over list?**

**Detailed Answer:**
Use set when:

* Uniqueness matters
* Fast membership checking is required

```python
x in my_set  # faster than list
```

---

# **SECTION 3: Functions & OOP**

## **Q36. What is function?**

**Detailed Answer:**
A function is a **reusable block of code** that performs a specific task and improves modularity.

---

## **Q37. What is return statement?**

**Detailed Answer:**

* Sends value back to caller
* Terminates function execution

If not used → returns `None`.

---

## **Q38. What are default arguments?**

**Detailed Answer:**
Arguments with predefined values, evaluated **once at function definition time**.

⚠️ Interview trap:

```python
def f(x=[]):  # bad practice
```

---

## **Q39. What is *args and **kwargs?**

**Detailed Answer:**

* `*args` → variable positional arguments (tuple)
* `**kwargs` → variable keyword arguments (dict)

Used in flexible APIs.

---

## **Q40. What is lambda function?**

**Detailed Answer:**
Anonymous one-line function, used for short operations.

```python
lambda x: x * 2
```

---

## **Q41. What is recursion?**

**Detailed Answer:**
Recursion is a programming technique where a **function calls itself** to solve a problem by breaking it into smaller sub-problems.

Every recursive function must have:

1. **Base case** – condition to stop recursion
2. **Recursive case** – function calling itself

```python
def factorial(n):
    if n == 1:      # base case
        return 1
    return n * factorial(n - 1)
```

**Interview insight:**

* Recursion uses the **call stack**
* Missing base case → infinite recursion → stack overflow
* Often used in tree traversal, DFS, divide-and-conquer problems

---

## **Q42. What is a class?**

**Detailed Answer:**
A class is a **blueprint or template** that defines:

* Data (attributes)
* Behavior (methods)

It does **not occupy memory** until an object is created.

```python
class User:
    def greet(self):
        print("Hello")
```

Used to model **real-world entities**.

---

## **Q43. What is an object?**

**Detailed Answer:**
An object is an **instance of a class** that:

* Occupies memory
* Contains actual values

```python
u = User()
```

**Interview tip:**
Class = design
Object = real thing created from design

---

## **Q44. What is `__init__`?**

**Detailed Answer:**
`__init__` is a **constructor method** that runs automatically when an object is created.

```python
class User:
    def __init__(self, name):
        self.name = name
```

Used to:

* Initialize object state
* Assign instance variables

---

## **Q45. What is `self`?**

**Detailed Answer:**
`self` refers to the **current object instance**.

Why it exists:

* Differentiates instance variables from local variables
* Allows access to object data and methods

```python
self.name = name
```

Without `self`, Python cannot know which object you’re referring to.

---

## **Q46. What is inheritance?**

**Detailed Answer:**
Inheritance allows a **child class to reuse properties and methods** of a parent class.

```python
class Animal:
    def speak(self):
        print("Sound")

class Dog(Animal):
    pass
```

Benefits:

* Code reuse
* Cleaner design
* Extensibility

---

## **Q47. What is polymorphism?**

**Detailed Answer:**
Polymorphism means **one interface, multiple implementations**.

Example:

```python
class Dog:
    def speak(self): print("Bark")

class Cat:
    def speak(self): print("Meow")
```

Calling `speak()` behaves differently based on object type.

---

## **Q48. What is method overriding?**

**Detailed Answer:**
Method overriding happens when a **child class provides its own implementation** of a parent method.

```python
class Dog(Animal):
    def speak(self):
        print("Bark")
```

Used to:

* Customize behavior
* Extend functionality

---

## **Q49. What is encapsulation?**

**Detailed Answer:**
Encapsulation is **restricting direct access** to object data to protect integrity.

```python
class User:
    def __init__(self):
        self._password = "secret"
```

Achieved using:

* Public
* Protected (`_var`)
* Private (`__var`)

---

## **Q50. What is abstraction?**

**Detailed Answer:**
Abstraction hides **implementation details** and shows only **essential features**.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass
```

Used in:

* Large systems
* Framework design
* API contracts

---

## **Q51. What are magic methods?**

**Detailed Answer:**
Magic methods (dunder methods) start and end with `__`.

Examples:

* `__init__` – constructor
* `__str__` – string representation
* `__len__` – length behavior

They allow **custom object behavior**.

---

## **Q52. What is classmethod?**

**Detailed Answer:**
A classmethod:

* Is bound to the **class**
* Receives `cls` instead of `self`

```python
@classmethod
def from_string(cls, data):
    return cls(data)
```

Used for **alternative constructors**.

---

## **Q53. What is staticmethod?**

**Detailed Answer:**
A staticmethod:

* Does not receive `self` or `cls`
* Acts like a normal function inside a class

```python
@staticmethod
def add(a, b):
    return a + b
```

Used for **utility/helper functions**.

---

## **Q54. Difference between classmethod and staticmethod?**

**Detailed Answer:**

| Feature      | classmethod     | staticmethod |
| ------------ | --------------- | ------------ |
| Access class | Yes (`cls`)     | No           |
| Use case     | Factory methods | Helper logic |

---

## **Q55. What is multiple inheritance?**

**Detailed Answer:**
When a class inherits from **more than one parent**.

```python
class A: pass
class B: pass
class C(A, B): pass
```

Python supports it using **MRO** to resolve conflicts.

---

## **Q56. What is MRO?**

**Detailed Answer:**
MRO (Method Resolution Order) defines the **order Python follows** to search methods in inheritance.

```python
ClassName.mro()
```

Uses **C3 linearization** algorithm.

---

## **Q57. What is super()?**

**Detailed Answer:**
`super()` calls the **parent class method** safely following MRO.

```python
super().method()
```

Avoids hardcoding parent class names.

---

## **Q58. What is isinstance()?**

**Detailed Answer:**
Checks if an object belongs to a class or its subclass.

```python
isinstance(obj, MyClass)
```

Better than `type()` for inheritance scenarios.

---

## **Q59. What is duck typing?**

**Detailed Answer:**
“If it looks like a duck and quacks like a duck, it’s a duck.”

Python cares about **behavior**, not type.

```python
obj.speak()
```

Used heavily in dynamic languages.

---

## **Q60. What is Pythonic code?**

**Detailed Answer:**
Code that:

* Is readable
* Uses built-in features
* Follows PEP 8

Example:

```python
# Pythonic
if x in data:
```

---

# **SECTION 4: Exceptions, Files & Advanced Concepts**

## **Q61. What is exception?**

**Detailed Answer:**
An exception is a **runtime error** that interrupts normal execution.

Examples:

* ZeroDivisionError
* ValueError

---

## **Q62. How to handle exceptions?**

**Detailed Answer:**
Using `try–except–finally` blocks.

```python
try:
    risky()
except Exception:
    handle()
finally:
    cleanup()
```

---

## **Q63. What is raise keyword?**

**Detailed Answer:**
Used to throw **custom exceptions**.

```python
raise ValueError("Invalid input")
```

---

## **Q64. What is with statement?**

**Detailed Answer:**
Manages resources automatically using **context managers**.

```python
with open("file.txt") as f:
    data = f.read()
```

Ensures cleanup even if error occurs.

---

## **Q65. What is a module?**

**Detailed Answer:**
A module is a **single Python file (`.py`)** that contains:

* Functions
* Classes
* Variables
* Executable code

Example:

```python
# math_utils.py
def add(a, b):
    return a + b
```

Used to:

* Organize code
* Reuse logic
* Avoid duplication

Imported using:

```python
import math_utils
```

---

## **Q66. What is a package?**

**Detailed Answer:**
A package is a **directory containing multiple modules**, usually with an `__init__.py` file.

Example:

```
utils/
 ├── __init__.py
 ├── math_utils.py
 └── string_utils.py
```

Used to:

* Structure large projects
* Create namespaces
* Improve maintainability

---

## **Q67. What is `__name__ == "__main__"`?**

**Detailed Answer:**
This condition checks **how a Python file is executed**.

* If run directly → `__name__ == "__main__"`
* If imported → `__name__ = module_name`

Example:

```python
if __name__ == "__main__":
    main()
```

Prevents code from executing unintentionally during imports.

---

## **Q68. What is a virtual environment?**

**Detailed Answer:**
A virtual environment is an **isolated Python runtime** with its own:

* Python interpreter
* Installed packages

Why it’s important:

* Avoids dependency conflicts
* Supports multiple projects on same system

Example:

```bash
python -m venv env
source env/bin/activate
```

---

## **Q69. What is pip?**

**Detailed Answer:**
`pip` is Python’s **package manager** used to:

* Install
* Upgrade
* Remove packages

Example:

```bash
pip install requests
```

Reads dependencies from `requirements.txt`.

---

## **Q70. What is logging?**

**Detailed Answer:**
Logging is the process of **recording application events** for debugging and monitoring.

Python supports log levels:

* DEBUG
* INFO
* WARNING
* ERROR
* CRITICAL

Example:

```python
import logging
logging.info("Application started")
```

Used in production instead of `print()`.

---

## **Q71. What is an iterator?**

**Detailed Answer:**
An iterator is an object that allows **sequential access** to elements.

Must implement:

* `__iter__()`
* `__next__()`

Example:

```python
it = iter([1, 2, 3])
next(it)
```

Iterators are memory efficient.

---

## **Q72. What is a generator?**

**Detailed Answer:**
A generator is a special function that **yields values one at a time** using `yield`.

Example:

```python
def numbers():
    for i in range(3):
        yield i
```

Benefits:

* Lazy evaluation
* Low memory usage

---

## **Q73. Generator vs List?**

**Detailed Answer:**

| Feature   | Generator  | List       |
| --------- | ---------- | ---------- |
| Memory    | Low        | High       |
| Execution | Lazy       | Immediate  |
| Use case  | Large data | Small data |

Use generators for **large datasets or streams**.

---

## **Q74. What is a decorator?**

**Detailed Answer:**
A decorator is a function that **modifies another function’s behavior** without changing its code.

Example:

```python
def my_decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")
    return wrapper
```

Used to add reusable behavior.

---

## **Q75. Real use of decorators?**

**Detailed Answer:**
Common real-world uses:

* Authentication checks
* Logging
* Caching (`@lru_cache`)
* Authorization
* Performance tracking

Example:

```python
@lru_cache
def compute():
    ...
```

---

## **Q76. What is asyncio?**

**Detailed Answer:**
`asyncio` is Python’s **asynchronous I/O framework**.

Used for:

* High-performance networking
* Non-blocking I/O

Works best for **I/O-bound tasks**.

---

## **Q77. What is async/await?**

**Detailed Answer:**
`async/await` is syntax for writing **non-blocking asynchronous code**.

Example:

```python
async def fetch():
    await asyncio.sleep(1)
```

Allows concurrency without threads.

---

## **Q78. What is multithreading?**

**Detailed Answer:**
Multithreading runs **multiple threads inside a single process**.

Good for:

* I/O-bound tasks

Limitation:

* Affected by Python’s GIL for CPU tasks

---

## **Q79. What is multiprocessing?**

**Detailed Answer:**
Multiprocessing runs **multiple processes**, each with its own Python interpreter.

Benefits:

* True parallelism
* Bypasses GIL

Used for **CPU-bound tasks**.

---

## **Q80. What is GIL?**

**Detailed Answer:**
GIL (Global Interpreter Lock) ensures only **one thread executes Python bytecode at a time**.

Purpose:

* Simplifies memory management

Impact:

* Limits CPU-bound threading

---

## **Q81. How to optimize Python code?**

**Detailed Answer:**
Common strategies:

* Use efficient data structures
* Avoid unnecessary loops
* Use built-ins
* Cache results
* Profile using `cProfile`

---

## **Q82. What is memory leak?**

**Detailed Answer:**
Memory leak occurs when memory is **allocated but never released** due to lingering references.

Common causes:

* Global variables
* Circular references

---

## **Q83. What is reference counting?**

**Detailed Answer:**
Python tracks **how many references** point to an object.

When count reaches zero → memory is freed.

---

## **Q84. What is circular reference?**

**Detailed Answer:**
Two or more objects referencing each other, preventing reference count from becoming zero.

Example:

```python
a.b = b
b.a = a
```

---

## **Q85. How does GC handle cycles?**

**Detailed Answer:**
Python’s garbage collector:

* Detects unreachable cycles
* Frees memory safely

---

## **Q86. What is monkey patching?**

**Detailed Answer:**
Monkey patching means **changing behavior of code at runtime**.

Example:

```python
module.func = new_func
```

Used cautiously, mainly in testing.

---

## **Q87. What is truthy/falsy?**

**Detailed Answer:**
Objects evaluated as `True` or `False` in conditions.

Falsy values:

* `None`, `0`, `""`, `[]`, `{}`

---

## **Q88. What is map/filter/reduce?**

**Detailed Answer:**
Functional tools:

* `map()` → transform
* `filter()` → select
* `reduce()` → aggregate

Often replaced by **comprehensions** in Pythonic code.

---

## **Q89. What is time complexity?**

**Detailed Answer:**
Time complexity measures **how execution time grows with input size**.

Examples:

* O(1)
* O(n)
* O(log n)

Used to evaluate algorithm efficiency.

---

## **Q90. Why Python is slower than C?**

**Detailed Answer:**
Python is slower because:

* Interpreted
* Dynamically typed
* Runtime checks

C is compiled and optimized at machine level.

---