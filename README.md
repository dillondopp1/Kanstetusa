# Kanstet USA website

Static one-page site: `index.html`, `assets/styles.css`, `assets/main.js`, images in `assets/img/`. No build step. Any static host works (GitHub Pages, Netlify, Cloudflare Pages).

## Contact form

The form posts to [FormSubmit](https://formsubmit.co), which emails each inquiry to **sales@kanstetusa.net**.

- The first time the form is submitted, FormSubmit sends a one-time **activation email** to sales@kanstetusa.net. Click the link in it, and every inquiry after that is delivered.
- So the sales@kanstetusa.net mailbox must exist before the form can work.
- To change where inquiries go, edit the `action` on `<form id="contact-form">` in `index.html`.

## Content sources

Photos, certificates and project history come from kanstetusa.com and kanstet.com (Kanstet Ltd., Estonia). The IAAF product certificates shown were issued to Kanstet Ltd. in 2013.

## Run locally

```bash
python -m http.server 8791
```
