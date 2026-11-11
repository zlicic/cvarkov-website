# cvarkov-site

Astro projekat za zvanični sajt Đorđa Cvarkova.

## Uslovi

- Node.js >= 22.23.4
- pnpm 12.x

## Razvoj

```bash
nvm use
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

Rezultat je u `dist/`. Uploaduj preko FTP-a na Namecheap hosting.

## Sadržaj

- Epizode: `src/content/episodes/*.md`
- Bio: `src/content/bio/index.md`
- Predstave: `src/content/shows/*.md`
