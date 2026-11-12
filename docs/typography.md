# Typography

## Typewriter font

Used for the archival / registrator-style page headers.

- **Font:** Special Elite
- **Source:** Google Fonts
- **Fallbacks:** `Courier New`, `monospace`
- **CSS variable:** `--font-typewriter`
- **Tailwind class:** `font-typewriter`

### Usage

```astro
<h1 class="font-typewriter">Naslov</h1>
```

```css
.typewriter {
  font-family: var(--font-typewriter);
}
```

### Load

Loaded in `site/src/layouts/Layout.astro`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&family=Special+Elite&display=swap"
  rel="stylesheet"
/>
```

## Other fonts

- **Display:** Oswald (`font-display`)
- **Body:** Inter (`font-body`)
