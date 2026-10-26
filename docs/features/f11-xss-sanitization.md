# Feature F11: Client-Side Input Sanitization

```mermaid
flowchart LR
    RawInput[User Input: `<script>alert('XSS')</script>`] --> Sanitize[sanitize function]
    Sanitize --> EntityOutput["`&lt;script&gt;alert('XSS')&lt;/script&gt;`"]
    EntityOutput --> HTMLTemplate[createTickerCardHTML]
    HTMLTemplate --> DOMInject[scrollerTrack.innerHTML]
    DOMInject --> Browser[Browser renders literal text safely without script execution]
```

---

## 1. Description & User-Facing Behavior
Protects the web page from arbitrary HTML or script injection when user reviews are rendered into the DOM.

---

## 2. Technical Code Trace & Implementation

- **Sanitization Utility**: [`testimonial.js:38-40`](file:///Users/avishjain/avishjain9-repos/53-testimonials-grid/testimonial.js#L38-L40)
  ```javascript
  function sanitize(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  ```
- **Application**: [`testimonial.js:61-63`](file:///Users/avishjain/avishjain9-repos/53-testimonials-grid/testimonial.js#L61-L63)
  ```javascript
  const safeName = sanitize(testimonial.name);
  const safeText = sanitize(testimonial.text);
  ```

---

## 3. Say It Out Loud
> "To protect against cross-site scripting attacks, I created a custom sanitize utility that encodes angle brackets into HTML entities before any user input is rendered into the DOM. Whenever a testimonial card is generated, both the reviewer's name and review text pass through this sanitizer. While converting raw strings into textContent is generally preferred, I needed to inject dynamic HTML strings into the scrolling track for duplication, making explicit sanitization essential. For enterprise production, I would enhance this by integrating a robust library like DOMPurify or using the HTML Sanitizer API."
