Answers to Questions

1) What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

- `getElementById(id)` returns the single element with the matching `id`. It's direct and fast but limited to IDs.
- `getElementsByClassName(className)` returns a live HTMLCollection of elements that have that class; it reflects DOM changes as they happen and is array-like but not a real array.
- `querySelector(selector)` returns the first element matching a CSS selector; `querySelectorAll(selector)` returns a static NodeList of all matches. These accept full CSS selectors and are more flexible.

2) How do you create and insert a new element into the DOM?

- Create with `document.createElement(tagName)`, set attributes or text (`el.textContent = 'text'`), and insert it using `parent.appendChild(el)`, `parent.insertBefore(el, ref)`, or `parent.append(el)`.

3) What is Event Bubbling? And how does it work?

- Event bubbling is when an event that occurs on a child element propagates upward through its parent elements to the document root. If multiple handlers listen to the same event type at different ancestors, the handler on the child runs first, then its parent, and so on, unless propagation is stopped.

4) What is Event Delegation in JavaScript? Why is it useful?

- Event delegation attaches a single event listener to a parent element to handle events for multiple child elements by inspecting `event.target`. It's useful to reduce listeners, handle dynamic children without reattaching listeners, and centralize behavior.

5) What is the difference between preventDefault() and stopPropagation() methods?

- `preventDefault()` cancels the event's default browser action (like following a link or submitting a form). `stopPropagation()` prevents the event from continuing to bubble (or capture) up the DOM, so ancestor handlers won't be invoked for that event.

Further improvements (optional)

- Add `localStorage` persistence so statuses survive reload.
- Convert styles to Tailwind/DaisyUI if requested.
- Add small unit tests or a build step.

