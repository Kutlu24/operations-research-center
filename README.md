# Optimizasyon Merkezi — Operations Research Reference

A static, Turkish-language reference site for **Operations Research (Yöneylem Araştırması)**: four core techniques with real mathematical formulations rendered via MathJax, application areas, tooling, and further-reading links.

🇩🇪 German version: [README.de.md](README.de.md)

## What it does

- **Teknikler (Techniques):** switchable cards for Linear Programming, Integer Programming, Queueing Theory, and Simulation — each with its standard mathematical formulation (LaTeX via [MathJax](https://www.mathjax.org/)), solution methods, and a worked example.
- **Uygulama Alanları (Applications):** production planning, logistics, inventory, staff scheduling, service systems.
- **Araçlar (Tools):** real solvers and libraries (CPLEX, Gurobi, CBC, Python's PuLP/Pyomo/SimPy, R's lpSolve/ompr, Excel Solver).
- **Kaynaklar (Resources):** links to NEOS Guide, INFORMS, and PuLP's documentation.

## Tech stack

Plain HTML, CSS and vanilla JavaScript. Math typesetting via [MathJax](https://www.mathjax.org/) (CDN).

## Running it

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

## Notes

The original source had only section headings and technique cards with `...` placeholder text where the formulas and explanations should be, plus a dependency on `polyfill.io` (a CDN pulled from public distribution after a 2024 supply-chain compromise). Both were replaced before publishing: real formulations/examples were written for all four techniques, and the polyfill dependency was removed (unnecessary — the ES6 features it polyfilled are natively supported everywhere now).
