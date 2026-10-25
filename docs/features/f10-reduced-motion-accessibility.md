# Feature F10: Prefers-Reduced-Motion Accessibility Guard

```mermaid
flowchart TD
    Init[Application Initialization] --> Query["window.matchMedia('(prefers-reduced-motion: reduce)')"]
    Query --> Check{prefersReducedMotion.matches?}
    Check -->|true (Motion Reduced)| Skip[Do NOT attach mousemove/mouseleave listeners]
    Check -->|false (Normal Motion)| Attach[Attach handleTilt & resetTilt listeners to document.body]
    Skip --> End[Static 2D Display without Disorienting Tilt]
    Attach --> EndMotion[Fluid 3D Tilt Enabled]
```

---

## 1. Description & User-Facing Behavior
Ensures complete respect for users who have enabled "Reduce Motion" in their system settings (macOS, Windows, iOS, Android). For these users, all dynamic 3D tilting is disabled to eliminate vestibular discomfort.

---

## 2. Technical Code Trace & Implementation

- **API Query & Guard**: [`testimonial.js:246-253`](file:///Users/avishjain/avishjain9-repos/53-testimonials-grid/testimonial.js#L246-L253)
  ```javascript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (!prefersReducedMotion.matches) {
      document.body.addEventListener('mousemove', handleTilt);
      document.body.addEventListener('mouseleave', resetTilt);
  }
  ```

---

## 3. Say It Out Loud
> "Web accessibility was a core priority when implementing the 3D tilt effect. Rapid parallax movement can cause disorientation or nausea for users with vestibular disorders. To safeguard against this, I query the browser's matchMedia API for the prefers-reduced-motion media feature. If the user has motion reduction enabled at the operating system level, my script completely skips attaching the mousemove and tilt listeners. This ensures full compliance with WCAG Guideline 2.3 for motion animations while keeping the interface functional."
