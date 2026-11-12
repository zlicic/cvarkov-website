# Đorđe Čvarkov — zvanični sajt

Sajt fiktivnog komičarskog brenda Đorđa Čvarkova. MVP sadrži početnu stranu, stranicu serije, predstave, biografiju i kontakt.

## Stack

- **Astro** — statički sajt
- **React** — interaktivne ostrve (tabovi sezona)
- **Tailwind CSS v4** — stilovi
- **Markdown/JSON** — sadržaj putem Astro Content Collections
- **Namecheap shared hosting** — statički hosting preko FTP-a
- **Cloudflare** — DNS

## Struktura

```
cvarkov-website/
├── CONTEXT.md              # Domen i rečnik
├── docs/
│   ├── adr/                # Arhitekturne odluke
│   └── phase-two.md        # Funkcionalnosti za fazu dva
├── site/                   # Astro projekat
│   ├── src/content/        # Epizode, bio, najave
│   ├── src/pages/          # Stranice
│   ├── src/components/     # Komponente
│   ├── src/layouts/        # Layouti
│   └── dist/               # Build izlaz za upload
└── README.md
```

## Razvoj

Potreban Node.js `>=22.23.4`. Projekat koristi `pnpm`. Ako koristiš `nvm`:

```bash
cd cvarkov-website
nvm use
cd site
pnpm install
pnpm run dev
```

## Ažuriranje sadržaja

Epizode se nalaze u `site/src/content/episodes/*.json`. Svaka epizoda je JSON objekat:

```json
{
  "title": "Naslov epizode",
  "season": 1,
  "episodeNumber": 1,
  "region": "Bačka",
  "village": "Naziv sela",
  "releaseDate": "2026-10-25",
  "type": "episode",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "thumbnail": "https://img.youtube.com/vi/.../maxresdefault.jpg",
  "description": "Kratak opis",
  "body": "Duži opis / transkript",
  "featured": false
}
```

Biografija se uređuje u `site/src/content/bio/index.md`.

## Build i deploy

```bash
cd site
pnpm run build
```

Uploaduj sadržaj foldera `site/dist/` na Namecheap hosting preko FTP-a.

## Faza dva

- Newsletter (Brevo/Mailchimp)
- Merch stranica
- Stranica partnera/saradnji
- Cloud headless CMS ako sadržaj poraste

## Ograničenje

Na sajtu se ne sme pominjati originalna emisija iz koje je lik nastao.
