def add(a, b):
    """Return sum of two numbers"""
    return a + b


def subtract(a, b):
    """Return difference of two numbers"""
    return a - b


def multiply(a, b):
    """Return product of two numbers"""
    return a * b


def divide(a, b):
    """Return division of two numbers"""
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    return a / b
