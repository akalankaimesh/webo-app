---
name: Luminous Glass
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
---

## Brand & Style

The design system is defined by a sense of depth, transparency, and ethereal modernism. It targets high-end SaaS and creative platforms where the user experience should feel like looking through polished lenses at a vibrant world. 

The aesthetic is **Glassmorphism**. It relies on the interplay of light and shadow on semi-transparent surfaces to create a clear visual hierarchy. The emotional response is one of clarity, technological sophistication, and weightlessness. By utilizing blurred background layers, the UI maintains focus on the active task while providing a rich, multi-dimensional context.

## Colors

The palette is rooted in deep **Slate** and vibrant **Blue**, optimized for a dark-mode first experience. 

- **Primary (Blue):** Used for critical actions and active states. In glass applications, it is applied with a 20-40% opacity layer or as a vibrant glow behind glass surfaces.
- **Secondary (Slate):** Provides the structural foundation. It is used for inactive states and subtle iconography.
- **Backgrounds:** Instead of flat colors, use radial and linear gradients. A typical background starts at `#0F172A` and transitions to a slightly lighter `#1E293B` to give the glass elements something to "refract."
- **Glass Surfaces:** Surface containers use a semi-transparent white or primary-tinted fill with a `backdrop-filter: blur(12px)`.

## Typography

Typography must be exceptionally sharp to remain legible against blurred backgrounds. 

- **Headlines (Manrope):** Chosen for its balanced, modern proportions that feel at home in a technical yet human environment. 
- **Body (Inter):** A utilitarian workhorse that ensures maximum readability at smaller scales.
- **Data/Labels (JetBrains Mono):** Used for metadata and technical labels to lean into the "modern tool" aesthetic.

To ensure contrast, always use pure white or high-contrast slate-100 for text on glass surfaces. Avoid thin font weights on translucent backgrounds; medium (500) or semi-bold (600) is preferred for legibility.

## Elevation & Depth

Depth is achieved through the stacking of blurred layers rather than traditional Z-index height.

- **Level 1 (Base):** Subtle background gradients.
- **Level 2 (Cards/Surfaces):** `backdrop-filter: blur(16px)` with a 1px solid border at 15% opacity white.
- **Level 3 (Modals/Popovers):** `backdrop-filter: blur(32px)` with a more pronounced inner glow and a soft, diffused shadow (`0 20px 50px rgba(0,0,0,0.3)`).

Shadows should never be "black." Use a dark slate or a deep blue tint in the shadow color to maintain the luminous quality of the design system.

## Shapes

The design system utilizes the `ROUND_TWELVE` (0.75rem / 12px) standard for most interface elements to soften the technical edge of the glass.

- **Buttons & Small Inputs:** 12px corner radius.
- **Cards & Containers:** 24px (`rounded-lg`) to 32px (`rounded-xl`) corner radius for a more organic, modern feel.
- **Selection Indicators:** Use pill shapes for active states in tabs or navigation to provide clear contrast against rectangular containers.

## Components

### Buttons
Primary buttons use a solid blue to slate gradient with a subtle outer glow. Secondary buttons are "glass" with a 1px white border (20% opacity) and white text.

### Cards
Cards are the primary expression of the glass aesthetic. They must feature:
1. `background: rgba(255, 255, 255, 0.05)`
2. `backdrop-filter: blur(12px)`
3. `border: 1px solid rgba(255, 255, 255, 0.1)`
4. `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)`

### Input Fields
Inputs are semi-transparent with a 1px bottom-border highlight or a full subtle ghost border. On focus, the border opacity increases to 50% Primary Blue, and the background blur intensifies.

### Chips & Tags
Small, highly rounded (pill-shaped) elements with a subtle 10% opacity primary color fill. Text should be uppercase and use the label font for a technical look.

### Checkboxes & Radios
Custom-styled with a blue glow effect when checked. The "unselected" state should be a simple glass circle/square with a low-opacity white border.