# Design System Guide

**Purpose:** Use design tokens instead of raw Tailwind classes for consistent styling across the project.

**Source of Truth:** Always refer to the Figma Design first.

## Typography

### Headings

```tsx
<h1>Heading</h1>                    {/* 48px, bold */}
<h2>Heading</h2>                    {/* 36px, semibold */}
<h3>Heading</h3>                    {/* 28px, semibold */}
<h4>Heading</h4>                    {/* 24px, semibold */}
<h5>Heading</h5>                    {/* 20px, semibold */}

{/* H5 Variants */}
<p className="text-h5-1">Bold</p>      {/* 20px, bold */}
<p className="text-h5-2">Semibold</p>  {/* 20px, semibold */}
<p className="text-h5-3">Medium</p>    {/* 20px, medium */}
```

### Body Text

```tsx
<p className="text-body1">Text</p>      {/* 18px, regular */}
<p className="text-body2">Text</p>      {/* 18px, medium */}
<p className="text-body-s1">Text</p>    {/* 16px, regular */}
<p className="text-body-s2">Text</p>    {/* 16px, medium */}
```

### Buttons

```tsx
<button className="text-btn-primary">Button</button>  {/* 18px, semibold */}
<button className="text-btn-s">Button</button>        {/* 14px, semibold */}
```

### Captions & Labels

```tsx
<span className="text-caption1">Caption</span>  {/* 14px, regular */}
<span className="text-caption2">Caption</span>  {/* 14px, medium */}
<span className="text-label1">Label</span>      {/* 12px, regular */}
<span className="text-label2">Label</span>      {/* 12px, medium */}
```

## Colors

### Text

```tsx
text-text-primary      {/* #251455 - Main text */}
text-text-secondary    {/* #6e6e6e - Secondary text */}
text-text-third        {/* #b0b0b0 - Tertiary text */}
text-text-disable      {/* #d7d9d9 - Disabled text */}
text-text-white        {/* #ffffff - White text */}
```

### Backgrounds

```tsx
bg-bg-primary          {/* #f9fafb - Primary background */}
bg-bg-secondary        {/* #ffffff - Secondary background */}
bg-bg-card-hover       {/* #f4f0ff - Card hover state */}
```

### Borders

```tsx
border-border-default  {/* #dbdbdb */}
border-border-post     {/* #f1f0f0 */}
```

### Brand

```tsx
text-brand-purple / bg-brand-purple  {/* #6b39f4 */}
```

### Status

```tsx
text-status-active         {/* #0fa632 - Active */}
text-status-canceled       {/* #c24141 - Canceled */}
text-status-completed      {/* #2f5fe3 - Completed */}
text-status-in-progress    {/* #d97706 - In Progress */}
```

### Priority

```tsx
{/* High */}
bg-priority-high-bg text-priority-high-text  {/* bg: #ffdada, text: #db2627 */}

{/* Medium */}
bg-priority-medium-bg text-priority-medium-text  {/* bg: #fef9c2, text: #c98905 */}

{/* Low */}
bg-priority-low-bg text-priority-low-text  {/* bg: #eeeef5, text: #7464a1 */}
```

### States

```tsx
bg-state-disabled      {/* #f8f8f8 */}
text-state-error       {/* #da392c */}
text-state-success     {/* #28a745 */}
```

### Icons

```tsx
text-icon-default      {/* #251455 */}
text-icon-star         {/* #f4b400 */}
text-icon-liked        {/* #ff4c4c */}
```

## Example

```tsx
function TaskCard() {
  return (
    <div className="bg-bg-secondary border border-border-default rounded-lg p-4">
      <h3>Task Title</h3>
      <p className="text-body-s1 text-text-secondary">Description</p>

      <div className="bg-priority-high-bg text-priority-high-text px-2 py-1 rounded">
        High Priority
      </div>

      <button className="text-btn-s text-brand-purple">View Details</button>
    </div>
  );
}
```

## Rules

1. Use design tokens: `text-body1`, Don't use raw Tailwind: `text-lg`
2. Combine tokens when needed: `text-body1 text-text-secondary`, Don't use custom values: `text-[#6e6e6e]`.

All tokens are defined in [`src/index.css`](src/index.css).
