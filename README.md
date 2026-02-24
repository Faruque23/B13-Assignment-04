Answers to Questions

1) What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

- `getElementById(id)` returns the single element with the matching `id`. It's direct and fast but limited to IDs.
- `getElementsByClassName(className)` returns a live HTMLCollection of elements that have that class; it reflects DOM changes as they happen and is array-like but not a real array.
- `querySelector(selector)` returns the first element matching a CSS selector; `querySelectorAll(selector)` returns a static NodeList of all matches. These accept full CSS selectors and are more flexible.
