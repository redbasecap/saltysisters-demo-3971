# SALTY SISTERS Website

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/redbasecap)

Reine HTML/CSS/JS-Website mit einem kleinen PHP-Endpunkt für Formular-Mails.

## Struktur

- `index.html` - Seitenstruktur und Inhalte
- `styles.css` - komplettes Styling ohne Build-Schritt
- `app.js` - Navigation, Mobile-Menü, Reveals, Community-Karte und Formularverhalten
- `mail.php` - POST-Endpunkt für das Kontaktformular
- `public/` - Bilder, Video, Favicons und Open-Graph-Bild

Die Community-Karte nutzt Leaflet über CDN direkt im HTML. Es gibt weiterhin keinen Node/Vite-Build-Schritt.

## Lokal starten

Für die statische Ansicht reicht ein einfacher Webserver:

```bash
python3 -m http.server 8080
```

Dann `http://localhost:8080` öffnen.

Das Formular braucht PHP. Lokal kann es so getestet werden:

```bash
php -S localhost:8080
```

## Mail-Konfiguration

`mail.php` sendet standardmässig an `info@saltysisters.eu`.

Auf dem Server kann der Empfänger über die Umgebungsvariable `SALTY_MAIL_TO` überschrieben werden:

```bash
SALTY_MAIL_TO=kontakt@example.com
```

Der Webserver muss PHPs `mail()` korrekt ausliefern können. Auf Shared Hosting ist das normalerweise über die Hosting-Mailkonfiguration geregelt.

## Branch-Hinweis

Die frühere React/TypeScript/Vite-Version ist im Branch `alte-ts-version` gesichert. `main` ist die statische HTML/CSS/JS/PHP-Version.
