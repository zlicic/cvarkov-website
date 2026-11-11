# Faza dva — odložene funkcionalnosti

Funkcionalnosti koje ne ulaze u MVP, ali su planirane kada sajt dobije publiku i kad postoji kapacitet za održavanje.

## Newsletter

- Cilj: prikupljanje mejlova publike i slanje najava.
- Sadržaj: nova epizoda, nova predstava, novi merch, važne saradnje.
- Alati za razmatranje: Brevo, Mailchimp, ConvertKit.
- Napomena: automatsko slanje kad izađe epizoda zahteva backend ili serverless funkciju (npr. Cloudflare Worker, Zapier, Make). Za početak je dovoljno ručno slanje.

## Merch

- Cilj: prodaja brendiranih proizvoda.
- Potrebno: integracija sa prodajnom platformom (npr. Stripe, Shopify, Printful) i posebna stranica `/merch`.
- Napomena: za MVP zameniti placeholder-om ili pomenom u footer-u.

## Saradnje / Partneri

- Cilj: prikaz posebnih projekata (npr. Yettle) i privlačenje novih sponzora.
- Stranica: `/saradnje` sa listom projekata i sekcijom "Postani partner".
- Napomena: trenutna Yettle saradnja se odvija na društvenim mrežama, pa ne zahteva posebnu stranicu u MVP-u.

## Cloud headless CMS

- Razlog: kada više ljudi uređuje sadržaj ili kada učestalost objavljivanja poraste.
- Opcije: Sanity, Contentful, Strapi (zahteva poseban Node.js host).
