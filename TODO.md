# TODO: Infinite Shape Animation for Profile Image

## Plan
- [x] Read and understand the codebase
- [x] Add custom keyframe animation to `app/globals.css`
- [x] Update `components/portfolio/hero.tsx` to apply the animation
- [x] Verify the implementation

## Details
- Target div: Lines 36-44 in `components/portfolio/hero.tsx`
- Animation: Infinite transition between `rounded-full` and `rounded-4xl`

## Changes Made
1. **app/globals.css**: Added custom `@keyframes border-radius-morph` animation that transitions between `border-radius: 9999px` (rounded-full) and `border-radius: 2rem` (rounded-4xl) over 4 seconds, running infinitely.

2. **components/portfolio/hero.tsx**: Applied `animate-border-radius-morph` class to the image container div and removed the static `rounded-full` class (since the animation handles it).


