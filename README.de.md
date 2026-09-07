# Optimizasyon Merkezi — Referenz für Operations Research

Eine statische, türkischsprachige Referenzseite für **Operations Research (Yöneylem Araştırması)**: vier Kerntechniken mit echten mathematischen Formulierungen (gerendert über MathJax), Anwendungsbereichen, Werkzeugen und weiterführenden Links.

🇬🇧 English version: [README.md](README.md)

## Was es macht

- **Teknikler (Techniken):** umschaltbare Karten für lineare Programmierung, ganzzahlige Programmierung, Warteschlangentheorie und Simulation — jeweils mit Standardformulierung (LaTeX über [MathJax](https://www.mathjax.org/)), Lösungsverfahren und einem durchgerechneten Beispiel.
- **Uygulama Alanları (Anwendungen):** Produktionsplanung, Logistik, Lagerhaltung, Personaleinsatzplanung, Dienstleistungssysteme.
- **Araçlar (Werkzeuge):** echte Solver und Bibliotheken (CPLEX, Gurobi, CBC, Pythons PuLP/Pyomo/SimPy, Rs lpSolve/ompr, Excel Solver).
- **Kaynaklar (Ressourcen):** Links zum NEOS Guide, zu INFORMS und zur PuLP-Dokumentation.

## Technik

Reines HTML, CSS und Vanilla-JavaScript. Mathematischer Satz über [MathJax](https://www.mathjax.org/) (CDN).

## Ausführen

`index.html` im Browser öffnen, oder den Ordner mit einem beliebigen statischen Server bereitstellen:

```bash
npx serve .
```

## Hinweise

Die ursprüngliche Quelle enthielt nur Abschnittsüberschriften und Technik-Karten mit `...`-Platzhaltertext anstelle von Formeln und Erklärungen, ausserdem eine Abhängigkeit von `polyfill.io` (ein CDN, das nach einem Supply-Chain-Vorfall 2024 aus der öffentlichen Verteilung genommen wurde). Beides wurde vor der Veröffentlichung ersetzt: echte Formulierungen/Beispiele für alle vier Techniken sowie Entfernung der Polyfill-Abhängigkeit (unnötig — die damit polyfillten ES6-Funktionen werden heute überall nativ unterstützt).
