# Codebase Documentation: Skeuomorphic Personal Portfolio

This document provides a comprehensive guide to the architecture, design choices, responsive behaviors, and utility scripts implemented on your skeuomorphic personal website.

---

## 1. Project Directory Structure

```text
Personal Website/
├── assets/
│   ├── ceramic_coffee_cup.png (alpha transparent)
│   ├── classic_pencil.png     (cropped to 940x78 canvas)
│   ├── linen_texture.png      (repeating background tile)
│   ├── open_notebook.png      (open sketchpad drawing)
│   ├── profile_pic.png        (Polaroid portrait photo)
│   ├── tied_notes_seal.png    (wax seal graphic)
│   └── vintage_compass.png    (brass compass dial cropped to tight circle)
├── css/
│   └── style.css              (tactile CSS declarations & mobile media queries)
├── js/
│   └── main.js                (state transitions, parallax shadows, & click audio)
├── index.html                 (semantic HTML layout)
└── codebase_documentation.md  (this file)
```

---

## 2. Component Structure Overview

### index.html
Organizes the physical layout workspace. Inside `<main class="desk-canvas">`, absolute desk elements are loaded as separate containers alongside the central folder card:
*   **Workspace Props**: The Notebook, Compass, Coffee Cup, and Pencils are loaded directly on the desk canvas.
*   **Main Card (`.main-card`)**: Consists of a tab navigation list `<nav class="card-tabs">` (touching folder tabs) and the main body `<div class="card-body">` (the paper surface).
*   **Tab Pages**: Under `.tab-content-wrapper`, each section (HOME, PROJECTS, ABOUT, BLOG, CONTACT) is designated as a `.tab-pane` element.

### style.css
Applies standard tactile skeuomorphic styling parameters.
*   **Design Tokens**: Set in `:root` (linen canvas, warm paper `#faf6ee`, graphite ink, and soft shadows).
*   **Bevels & Inset Panels**: Recessed elements like the bio container and form inputs combine dark top-left inset shadows (`rgba(0,0,0,0.12)`) and white bottom-right inset highlights (`rgba(255,255,255,0.8)`) to carve virtual pockets into the paper.
*   **Active Depressing**: When a folder tab is selected, it receives a negative margin-top (`-4px`), extra top padding (`14px`), and a recessed shadow to look like it has been physically pressed down.

### js/main.js
Handles dynamic behavior:
*   **Tab Controls**: Manages class changes (`.active` additions/removals) on click.
*   **Audio Feedback**: Clicking tabs triggers the **Web Audio API** to generate a synthetic oscillator beep (`triangle` wave exponential ramp down in 150ms), mimicking a physical key click.
*   **Compass Spin**: Clicking the compass triggers a transition that spins the brass dial randomly by over 1000 degrees, centering back to 0 degrees after 1.5s.
*   **3D Mouse Parallax**: Captures cursor coordinate shifts inside the workspace on desktop viewports and translates shadow offsets in the opposite direction, creating physical depth.

---

## 3. Desktop vs. Mobile Architecture

To maintain the flat-lay desk appearance on small viewports without sacrificing mobile accessibility, media queries (`@media (max-width: 1200px)`) introduce the following responsive layout adjustments:

### Stacking Flow (`flex-direction: column`)
The main desk canvas (`.desk-canvas`) is transformed from a desktop centering flex-box to a vertical stacking column (`flex-direction: column`). Grid columns in the card stack vertically.

### Priority Layout Order (`order` property)
To showcase the developer profile instantly on mobile, the middle column (`.col-middle`) is assigned `order: -1` in the column flex container, moving it to the top. Inside the column, the Polaroid photo wrapper (`.polaroid-frame`) is assigned `order: -1` to position it before the introductory bio text.

### Responsive Drawings Overlays & Pointer Events
*   **Notebook**: Positioned absolutely in the top-left corner on mobile (`left: -35px; top: 75px; width: 150px; transform: rotate(-8deg); z-index: 30;`). Styled as an interactive link with `pointer-events: auto` so clicking it directly navigates to the BLOG tab.
*   **Compass**: Positioned absolutely on the right margin (`right: -15px; top: 230px; width: 90px; height: 90px; transform: rotate(15deg); z-index: 30;`) overlapping the card edge, also set to `pointer-events: auto` so that mobile users can click it to spin it.
*   **Diagonal Pencil**: Positioned absolutely near the top-right of the tabs (`left: 70%; top: 40px; width: 260px; height: 22px; z-index: 30; transform: rotate(25deg);`) overlapping the tab margin safely, using `pointer-events: none` to let clicks pass through to the tabs.

### Responsive distributed tabs
*   **Flex Distribution**: To keep all 5 folder tabs (HOME, PROJECTS, ABOUT, BLOG, CONTACT) visible on narrow phone screens, the tab navigation list uses a space-between flex layout (`display: flex; justify-content: space-between; width: 100%;`).
*   **Adaptive Sizing**: Individual tab buttons are set to grow evenly (`flex: 1`) with smaller text size (`font-size: 0.65rem`) and tighter side padding (`8px 5px`). This guarantees the contact tab is fully visible and clickable without wrapping onto multiple lines.

### Header Logo Scaling
On mobile, the name banner is scaled down to a smaller size (`font-size: 0.78rem`, `letter-spacing: 0.1em`) with reduced header margins. This prevents text wrapping onto multiple lines and keeps the top bar header clean and professional.

---

## 4. Advanced Techniques Implemented

### Opposing 3D Inset Shadows
To render realistic depth, components use opposing highlights and shadows:
```css
/* Carved recessed look */
box-shadow: inset 1px 1.5px 3px rgba(0, 0, 0, 0.12), 
            inset -1px -1.5px 3px rgba(255, 255, 255, 0.8);
```

### Irregular Shape Shadows
Traditional rectangular boxes use `box-shadow`, but organic elements (pencils, compass) use CSS filters:
```css
/* Shadow outlines matching image boundaries */
filter: drop-shadow(8px 10px 6px rgba(45, 35, 25, 0.3));
```

### Dynamic Shadow Relocation
JavaScript tracks normal mouse coordinates ($X, Y$) from $-1$ to $1$. The drop shadows are relocated dynamically in the opposite direction of the translation, mimicking a real overhead light source:
$$ShadowX = 5 - (MouseX \times 8)$$
$$ShadowY = 10 - (MouseY \times 8)$$

### Bounded Canvas Cropping
To prevent transparent spaces in image assets (like the classic pencil) from blocking mouse clicks, the image canvas was cropped programmatically from `1024x1024` to `940x78` (aspect ratio 12:1). The CSS element dimensions were then set to match this thin shape (`width: 580px; height: 48px;`), tightening the clickable footprint.

### Client Cache Busting
Version queries (`?v=18`) are appended to link and image sources inside `index.html`. This tells the browser to fetch the latest assets from the server instead of loading stale, cached copies.

