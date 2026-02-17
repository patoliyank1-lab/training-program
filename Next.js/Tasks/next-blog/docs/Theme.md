# 🎨 Root Colors for Your Blog (Purple + Black + White)

---

## ☀️ **LIGHT MODE**

```css
:root {
  /* ── BASE ── */
  --background:        #ffffff;
  --background-soft:   #fafafa;
  --background-muted:  #f4f4f6;
  --foreground:        #09090b;
  --foreground-soft:   #3f3f46;
  --foreground-muted:  #71717a;

  /* ── PURPLE SHADES ── */
  --purple-50:         #faf5ff;
  --purple-100:        #f3e8ff;
  --purple-200:        #e9d5ff;
  --purple-300:        #d8b4fe;
  --purple-400:        #c084fc;
  --purple-500:        #a855f7;
  --purple-600:        #9333ea;
  --purple-700:        #7c3aed;
  --purple-800:        #6d28d9;
  --purple-900:        #4c1d95;
  --purple-950:        #2e1065;

  /* ── SEMANTIC (what you use in components) ── */
  --primary:           #9333ea;   /* purple-600 */
  --primary-hover:     #7c3aed;   /* purple-700 */
  --primary-light:     #f3e8ff;   /* purple-100 */
  --primary-text:      #ffffff;   /* text on primary bg */

  /* ── BORDERS ── */
  --border:            #e4e4e7;
  --border-strong:     #d4d4d8;
  --border-purple:     #d8b4fe;   /* purple-300 */

  /* ── TEXT ── */
  --text-heading:      #09090b;
  --text-body:         #3f3f46;
  --text-muted:        #71717a;
  --text-disabled:     #a1a1aa;
  --text-on-purple:    #ffffff;
  --text-purple:       #7c3aed;   /* purple text on white */

  /* ── SURFACE / CARDS ── */
  --surface:           #ffffff;
  --surface-raised:    #fafafa;
  --surface-overlay:   #f4f4f6;
  --surface-purple:    #faf5ff;   /* purple-50 */

  /* ── STATUS COLORS ── */
  --success:           #16a34a;
  --success-bg:        #f0fdf4;
  --error:             #dc2626;
  --error-bg:          #fef2f2;
  --warning:           #d97706;
  --warning-bg:        #fffbeb;
  --info:              #9333ea;   /* use purple as info */
  --info-bg:           #faf5ff;

  /* ── SHADOWS ── */
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.06);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.10);
  --shadow-purple:     0 4px 20px rgba(147,51,234,0.20);
}
```

---

## 🌙 **DARK MODE**

```css
[data-theme="dark"] {
  /* ── BASE ── */
  --background:        #09090b;
  --background-soft:   #111116;
  --background-muted:  #18181b;
  --foreground:        #fafafa;
  --foreground-soft:   #e4e4e7;
  --foreground-muted:  #a1a1aa;

  /* ── PURPLE SHADES (same, no change needed) ── */
  --purple-50:         #faf5ff;
  --purple-100:        #f3e8ff;
  --purple-200:        #e9d5ff;
  --purple-300:        #d8b4fe;
  --purple-400:        #c084fc;
  --purple-500:        #a855f7;
  --purple-600:        #9333ea;
  --purple-700:        #7c3aed;
  --purple-800:        #6d28d9;
  --purple-900:        #4c1d95;
  --purple-950:        #2e1065;

  /* ── SEMANTIC ── */
  --primary:           #a855f7;   /* purple-500 (brighter for dark bg) */
  --primary-hover:     #c084fc;   /* purple-400 */
  --primary-light:     #2e1065;   /* purple-950 (dark tint) */
  --primary-text:      #ffffff;

  /* ── BORDERS ── */
  --border:            #27272a;
  --border-strong:     #3f3f46;
  --border-purple:     #4c1d95;   /* purple-900 */

  /* ── TEXT ── */
  --text-heading:      #fafafa;
  --text-body:         #e4e4e7;
  --text-muted:        #a1a1aa;
  --text-disabled:     #52525b;
  --text-on-purple:    #ffffff;
  --text-purple:       #c084fc;   /* purple-400 on dark */

  /* ── SURFACE / CARDS ── */
  --surface:           #111116;
  --surface-raised:    #18181b;
  --surface-overlay:   #27272a;
  --surface-purple:    #1a0a2e;   /* deep dark purple */

  /* ── STATUS COLORS ── */
  --success:           #4ade80;
  --success-bg:        #052e16;
  --error:             #f87171;
  --error-bg:          #450a0a;
  --warning:           #fbbf24;
  --warning-bg:        #422006;
  --info:              #c084fc;
  --info-bg:           #1a0a2e;

  /* ── SHADOWS ── */
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.30);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.40);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.50);
  --shadow-purple:     0 4px 20px rgba(168,85,247,0.25);
}
```

---

## 📊 **Quick Reference**

### **What Each Variable Does:**

| Variable | Light | Dark | Used For |
|----------|-------|------|----------|
| `--background` | #ffffff | #09090b | Page background |
| `--background-soft` | #fafafa | #111116 | Subtle sections |
| `--background-muted` | #f4f4f6 | #18181b | Code blocks, inputs |
| `--primary` | #9333ea | #a855f7 | Buttons, links, accents |
| `--primary-hover` | #7c3aed | #c084fc | Hover states |
| `--primary-light` | #f3e8ff | #2e1065 | Badge backgrounds |
| `--text-heading` | #09090b | #fafafa | H1, H2, H3 |
| `--text-body` | #3f3f46 | #e4e4e7 | Paragraph text |
| `--text-muted` | #71717a | #a1a1aa | Dates, captions |
| `--text-purple` | #7c3aed | #c084fc | Purple colored text |
| `--surface` | #ffffff | #111116 | Cards, modals |
| `--surface-raised` | #fafafa | #18181b | Elevated cards |
| `--surface-purple` | #faf5ff | #1a0a2e | Purple tinted cards |
| `--border` | #e4e4e7 | #27272a | Default borders |
| `--border-purple` | #d8b4fe | #4c1d95 | Purple borders |
| `--shadow-purple` | rgba purple 20% | rgba purple 25% | Purple glow effect |

---

## 🎯 **Most Used Variables in Components**

```css
/* Buttons */
background: var(--primary)
background: var(--primary-hover)   /* on hover */
color: var(--primary-text)

/* Cards */
background: var(--surface)
border: 1px solid var(--border)
box-shadow: var(--shadow-md)

/* Headings */
color: var(--text-heading)

/* Body Text */
color: var(--text-body)

/* Muted Text (dates, captions) */
color: var(--text-muted)

/* Purple Badge/Tag */
background: var(--primary-light)
color: var(--text-purple)

/* Page Background */
background: var(--background)

/* Input Fields */
background: var(--background-muted)
border: 1px solid var(--border)

/* Purple Glow (featured cards) */
box-shadow: var(--shadow-purple)
```

---

## 💡 **How to Switch Theme**

```typescript
// ThemeContext.tsx
// Light mode (default)
document.documentElement.removeAttribute('data-theme')

// Dark mode
document.documentElement.setAttribute('data-theme', 'dark')
```

---

**Total Variables: 38 in Light + 38 in Dark = 76 variables**

Simple, clean, and covers every use case in your blog! 🎨