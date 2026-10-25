import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
  defineConfig({
    title: 'Polished Testimonials',
    description: 'High-Performance Vanilla JS Review Portal & Marquee Ticker Documentation',
    appearance: 'dark',
    base: '/',
    themeConfig: {
      nav: [
        { text: 'Guide', link: '/README' },
        { text: 'Features', link: '/01-features' },
        { text: 'API Reference', link: '/03-api-reference' },
        { text: 'Comparisons', link: '/04-tech-comparisons' },
        { text: 'Interview Q&A', link: '/09-interview-qa' },
        { text: 'System Design', link: '/system-design/README' },
        { text: 'Say It Out Loud', link: '/14-say-it-out-loud' }
      ],
      sidebar: [
        {
          text: 'Project Overview',
          collapsed: false,
          items: [
            { text: 'Reading Index & Guide', link: '/README' },
            { text: '00. Project Type Classification', link: '/00-project-type' },
            { text: '00a. Full Project Analysis', link: '/00a-project-analysis' },
            { text: '00b. Project Elevator Pitch', link: '/00b-project-pitch' },
            { text: '00. Project Map & File Tree', link: '/00-project-map' }
          ]
        },
        {
          text: 'Feature Inventory',
          collapsed: false,
          items: [
            { text: '01. All Features Overview', link: '/01-features' },
            { text: 'F1: Image Upload & Preview', link: '/features/f1-image-upload-preview' },
            { text: 'F2: 5-Star Rating System', link: '/features/f2-star-rating-system' },
            { text: 'F3: Floating Label Inputs', link: '/features/f3-floating-label-input' },
            { text: 'F4: Submission & Simulated Latency', link: '/features/f4-testimonial-submission-state' },
            { text: 'F5: LocalStorage Persistence', link: '/features/f5-localstorage-persistence' },
            { text: 'F6: Infinite Marquee Ticker', link: '/features/f6-infinite-marquee-ticker' },
            { text: 'F7: Dynamic Speed Scaling', link: '/features/f7-dynamic-speed-duration' },
            { text: 'F8: Hover Pause Interaction', link: '/features/f8-hover-pause-interaction' },
            { text: 'F9: 3D Perspective Tilt', link: '/features/f9-tilt-3d-perspective' },
            { text: 'F10: Reduced Motion Guard', link: '/features/f10-reduced-motion-accessibility' },
            { text: 'F11: Client HTML Sanitization', link: '/features/f11-xss-sanitization' },
            { text: 'F12: Testimonial Data Reset', link: '/features/f12-clear-data-management' }
          ]
        },
        {
          text: 'Architecture & Implementation',
          collapsed: false,
          items: [
            { text: '02. Step-by-Step Build Order', link: '/02-build-order' },
            { text: '03. Web Platform API Reference', link: '/03-api-reference' },
            { text: '04. Tech Choice Comparisons', link: '/04-tech-comparisons' },
            { text: '05. High-Level Architecture', link: '/05-architecture' },
            { text: '06. Security Audit & OWASP', link: '/06-security' },
            { text: '07. AI Integration Specification', link: '/07-ai-integration' },
            { text: '08. Quality, Ops & Profiling', link: '/08-quality-and-ops' }
          ]
        },
        {
          text: 'Interview Readiness',
          collapsed: false,
          items: [
            { text: '09. 150+ Interview Q&A', link: '/09-interview-qa' },
            { text: '10. Gaps & Engineering Backlog', link: '/10-gaps-and-improvements' },
            { text: '11. Technical Glossary', link: '/11-glossary' },
            { text: '12. Developer Confirm List', link: '/12-confirm-list' },
            { text: '13. Master 275-Item Checklist', link: '/13-master-checklist' },
            { text: '14. Say It Out Loud Scripts', link: '/14-say-it-out-loud' }
          ]
        },
        {
          text: 'Senior System Design Suite',
          collapsed: true,
          items: [
            { text: 'System Design Overview', link: '/system-design/README' },
            { text: '14.1 Requirements & Estimation', link: '/system-design/14.1-requirements-and-estimation' },
            { text: '14.2 Architecture Styles', link: '/system-design/14.2-architecture-styles' },
            { text: '14.3 Networking & Communication', link: '/system-design/14.3-networking-and-communication' },
            { text: '14.4 Load Balancing & Scaling', link: '/system-design/14.4-load-balancing-and-scaling' },
            { text: '14.5 Databases & Storage', link: '/system-design/14.5-databases-and-storage' },
            { text: '14.6 Caching Architectures', link: '/system-design/14.6-caching' },
            { text: '14.7 Messaging & Queues', link: '/system-design/14.7-messaging-queues-async' },
            { text: '14.8 Consistency & Concurrency', link: '/system-design/14.8-consistency-concurrency-distributed' },
            { text: '14.9 Reliability & Resilience', link: '/system-design/14.9-reliability-and-resilience' },
            { text: '14.10 API Design & Rate Limiting', link: '/system-design/14.10-api-design-and-rate-limiting' },
            { text: '14.11 Security Architecture', link: '/system-design/14.11-security-architecture' },
            { text: '14.12 Search & AI Architecture', link: '/system-design/14.12-search-and-ai-architecture' },
            { text: '14.13 Real-Time Systems', link: '/system-design/14.13-real-time-systems' },
            { text: '14.14 Observability & Operations', link: '/system-design/14.14-observability-and-operations' },
            { text: '14.15 Performance Engineering', link: '/system-design/14.15-performance-engineering' },
            { text: '14.16 Cost & Trade-offs', link: '/system-design/14.16-cost-and-tradeoffs' },
            { text: '14.17 Classic System Design Qs', link: '/system-design/14.17-classic-system-design-questions' },
            { text: 'Design Decisions Log', link: '/system-design/decisions' }
          ]
        }
      ],
      search: {
        provider: 'local'
      },
      outline: [2, 3],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/AVISHJAIN9/testimonials' }
      ]
    },
    mermaid: {
      theme: 'dark'
    }
  })
);
