"""
app.py — PYTHON CORE (DEEPEST)
"""

print("===== PYTHON CORE START =====")

# =====================================================
# 1. OBJECT MODEL (EVERYTHING IS OBJECT)
# =====================================================
x = 10
print(type(x), id(x))

# =====================================================
# 2. IMMUTABLE vs MUTABLE
# =====================================================
a = 10
b = a
b = 20
print(a)

lst1 = [1, 2]
lst2 = lst1
lst2.append(3)
print(lst1)

# =====================================================
# 3. TYPE CHECKING
# =====================================================
print(isinstance(10, int))
print(type(None))

# =====================================================
# 4. STRINGS
# =====================================================
s = " Hello "
print(s.strip().upper())
print(s[1:4])

# =====================================================
# 5. NUMBERS
# =====================================================
print(0.1 + 0.2)
print(pow(2, 3))

# =====================================================
# 6. CONTROL FLOW
# =====================================================
for i in range(2):
    print("for", i)

n = 0
while n < 2:
    print("while", n)
    n += 1

# =====================================================
# 7. FUNCTIONS
# =====================================================
def f(a, b=1):
    return a + b

lam = lambda x: x * 2

print(f(1), lam(2))

# =====================================================
# 8. CLOSURES
# =====================================================
def counter():
    count = 0
    def inc():
        nonlocal count
        count += 1
        return count
    return inc

c = counter()
print(c(), c())

# =====================================================
# 9. DEFAULT ARG PITFALL
# =====================================================
def bad(x, lst=[]):
    lst.append(x)
    return lst

print(bad(1))
print(bad(2))  # shared

# =====================================================
# 10. LISTS
# =====================================================
lst = [1, 2, 3]
lst.append(4)
lst.pop()
print([x * 2 for x in lst])

# =====================================================
# 11. TUPLES
# =====================================================
t = (1, 2)
a, b = t

# =====================================================
# 12. SETS
# =====================================================
s = {1, 1, 2}
s.add(3)
print(s)

# =====================================================
# 13. DICTS
# =====================================================
d = {"a": 1}
d["b"] = 2
print(d.items())

# =====================================================
# 14. COMPREHENSIONS
# =====================================================
print({x: x*x for x in range(3)})

# =====================================================
# 15. ITERATORS
# =====================================================
it = iter([1, 2])
print(next(it), next(it))

# =====================================================
# 16. GENERATORS
# =====================================================
def gen():
    yield 1
    yield 2

for v in gen():
    print(v)

# =====================================================
# 17. DECORATORS
# =====================================================
def deco(fn):
    def wrap(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrap

@deco
def add(a, b):
    return a + b

print(add(2, 3))

# =====================================================
# 18. CONTEXT MANAGER
# =====================================================
class CM:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, t, v, tb):
        print("exit")

with CM():
    print("inside")

# =====================================================
# 19. CLASSES & MRO
# =====================================================
class A:
    def who(self):
        return "A"

class B(A):
    pass

print(B().who())

# =====================================================
# 20. MAGIC METHODS
# =====================================================
class Num:
    def __init__(self, x):
        self.x = x
    def __add__(self, other):
        return Num(self.x + other.x)
    def __repr__(self):
        return f"Num({self.x})"

print(Num(1) + Num(2))

# =====================================================
# 21. EXCEPTIONS
# =====================================================
try:
    int("x")
except ValueError:
    print("ValueError")

# =====================================================
# 22. THREADING vs GIL
# =====================================================
import threading, time

def task():
    time.sleep(0.5)
    print("thread")

t = threading.Thread(target=task)
t.start()
t.join()

# =====================================================
# 23. FILE I/O
# =====================================================
with open("py.txt", "w") as f:
    f.write("PY CORE")

with open("py.txt") as f:
    print(f.read())

# =====================================================
# 24. SYS & RUNTIME
# =====================================================
import sys
print(sys.version)

# =====================================================
# 25. OBJECT IDENTITY vs EQUALITY
# =====================================================
a = [1, 2]
b = [1, 2]
print(a == b, a is b)

# =====================================================
# 26. INTERNING (SMALL INTS / STRINGS)
# =====================================================
x = 256
y = 256
print(x is y)   # CPython optimization

# =====================================================
# 27. DESCRIPTORS (CORE OF @property)
# =====================================================
class Descriptor:
    def __get__(self, obj, objtype):
        return "value"

class Test:
    attr = Descriptor()

print(Test().attr)

# =====================================================
# 28. __slots__ (MEMORY OPTIMIZATION)
# =====================================================
class Slim:
    __slots__ = ("x",)

    def __init__(self, x):
        self.x = x

s = Slim(10)
print(s.x)

# =====================================================
# 29. METHOD RESOLUTION ORDER (MRO)
# =====================================================
class X: pass
class Y(X): pass
class Z(Y): pass

print(Z.mro())

# =====================================================
# 30. METACLASSES (CLASS OF A CLASS)
# =====================================================
class Meta(type):
    def __new__(cls, name, bases, dct):
        dct["meta"] = "injected"
        return super().__new__(cls, name, bases, dct)

class M(metaclass=Meta):
    pass

print(M.meta)

# =====================================================
# 31. CALLABLE OBJECTS
# =====================================================
class Callable:
    def __call__(self, x):
        return x * 2

c = Callable()
print(c(5))

# =====================================================
# 32. COPY vs DEEPCOPY
# =====================================================
import copy
orig = [[1]]
shallow = copy.copy(orig)
deep = copy.deepcopy(orig)
orig[0].append(2)
print(shallow, deep)

# =====================================================
# 33. GARBAGE COLLECTION
# =====================================================
import gc
print(gc.isenabled())

# =====================================================
# 34. REFERENCE COUNTING (CPYTHON)
# =====================================================
import sys
x = []
print(sys.getrefcount(x))

# =====================================================
# 35. IMPORT SYSTEM
# =====================================================
print(__name__)

# =====================================================
# 36. ASSERTIONS
# =====================================================
def div(a, b):
    assert b != 0, "division by zero"
    return a / b

print(div(4, 2))

# =====================================================
# 37. FUNCTION ANNOTATIONS
# =====================================================
def annotated(x: int) -> int:
    return x * 2

print(annotated(5))

# =====================================================
# 38. ASYNC CORE (EVENT LOOP)
# =====================================================
import asyncio

async def async_task():
    await asyncio.sleep(0.1)
    return "async done"

print(asyncio.run(async_task()))

# =====================================================
# 39. GENERATOR SEND
# =====================================================
def receiver():
    val = yield
    print("received:", val)

r = receiver()
next(r)
r.send(10)

# =====================================================
# 40. WITH STATEMENT UNDER THE HOOD
# =====================================================
class FileLike:
    def __enter__(self):
        print("acquire")
        return self
    def __exit__(self, *args):
        print("release")

with FileLike():
    print("working")

print("===== PYTHON CORE END =====")
