---
name: OmniBook Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a high-performance B2B SaaS environment, prioritizing utility, clarity, and white-label flexibility. It targets professional merchants and administrators who require a tool that feels like an extension of their own brand. 

The aesthetic is **Modern Corporate**, characterized by a systematic approach to layout, a refined "utilitarian-premium" feel, and a focus on content over decoration. It avoids unnecessary flourishes to ensure that when a customer swaps the primary color tokens, the UI remains cohesive and structurally sound. The emotional response should be one of competence, reliability, and precision, similar to industry leaders like Stripe or Shopify.

## Colors

The color architecture is built on a white-label foundation using functional CSS variables. 

- **Primary (--color-primary):** Used for core navigation, text, and dominant UI elements to provide a sense of authority.
- **Secondary (--color-secondary):** The primary action color, used for CTA buttons, active states, and highlights.
- **Accent (--color-accent):** Reserved for success states, growth indicators, and positive financial data.
- **Neutral (--color-bg):** A cool-toned slate used for backgrounds to reduce eye strain during long sessions.
- **Border (--color-border):** A consistent, low-contrast slate for defining structural boundaries without adding visual noise.

## Typography

This design system utilizes **Inter** exclusively to leverage its exceptional legibility and systematic weight distribution. 

The hierarchy is strictly enforced. Display sizes use tighter letter spacing and heavier weights to create a "blocky," authoritative feel in headers. Body text maintains a generous line height (1.5x) to ensure readability in data-heavy CMS views. Label styles are used for navigation items and table headers, often employing a medium or semi-bold weight to distinguish them from standard body copy.

## Layout & Spacing

The layout philosophy follows a **4px baseline grid** and a **12-column fluid grid** for dashboard content. 

- **Desktop:** 12 columns with 24px gutters. Sidebar navigation is fixed at 280px, with the main content area expanding fluidly.
- **Tablet:** 8 columns with 16px gutters. Sidebar collapses into a hamburger menu or narrow icon rail.
- **Mobile:** 4 columns with 16px margins. Content stacks vertically, with full-width cards and buttons.

The design system mandates generous whitespace around "interchangeable blocks" to prevent the interface from feeling cluttered. Content sections should be separated by a minimum of `xl` (48px) spacing on desktop to maintain a premium, airy feel.

## Elevation & Depth

To maintain a clean, professional aesthetic, this design system uses **Low-Contrast Outlines** as the primary method for defining surfaces. 

- **Level 0 (Background):** Slate 50 (#F8FAFC) for the main canvas.
- **Level 1 (Cards/Containers):** Pure white (#FFFFFF) backgrounds with a 1px solid border (#E2E8F0). No shadows are used at this level to keep the UI flat and fast.
- **Level 2 (Dropdowns/Modals):** Pure white background with a subtle, highly diffused ambient shadow (0px 10px 15px -3px rgba(15, 23, 42, 0.08)) to indicate temporary elevation above the workspace.
- **Interaction:** Hover states on interactive elements use a subtle tonal shift (background tint or border color change) rather than a shadow increase.

## Shapes

The shape language is **Rounded (Level 2)**, utilizing an 8px (0.5rem) base radius for standard components like buttons, input fields, and small cards. 

This specific radius provides a balance between the "friendliness" of fully rounded corners and the "rigidity" of sharp corners, fitting the professional SaaS persona. For larger containers and "interchangeable blocks" in the CMS, use `rounded-lg` (16px) to clearly define separate functional areas.

## Components

- **Buttons:** Primary buttons use a solid `--color-secondary` background with white text. Secondary buttons use a white background with a `--color-border` outline. Transitions on hover should be a 150ms ease-in-out tonal darkening.
- **Data Tables:** Use a borderless internal structure with 1px horizontal dividers. Header rows use `label-sm` with a light slate background. Rows should have a subtle hover highlight (#F1F5F9).
- **Sidebar Navigation:** A vertical rail using `--color-primary` as the background. Active links should be signaled by a 3px vertical "accent bar" using `--color-secondary` on the leading edge.
- **Input Fields:** 1px solid borders (#E2E8F0) that transition to 2px `--color-secondary` on focus. Labels sit clearly above the input using `label-md`.
- **Feature Grids:** Use a 3-column layout on desktop. Each "block" is a Level 1 container (white background, subtle border) with centered icon and text.
- **Split-Screen Editor:** A 50/50 or 40/60 split. The left pane (Control) uses a light grey background to distinguish it from the right pane (Live Preview), which is white.