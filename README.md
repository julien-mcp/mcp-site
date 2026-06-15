# Site Momentum Creative Productions

Site statique premium (HTML/CSS/JS, sans framework) conçu pour GitHub Pages.
Charte MCP : bordeaux `#6E1A28` · or `#C9A24A` · ivoire `#FAF6EE` · Gotham.

## Structure

```
index.html              Accueil
realisations.html       Réalisations (filtres + modale vidéo)
agence.html             L'agence (histoire, approche, matériel, équipe)
contact.html            Contact + formulaire
mentions-legales.html   Mentions légales (⚠️ à relire avant mise en ligne)
assets/css/styles.css   Design system complet
assets/js/main.js       Nav, timecode, filtres, modale, formulaire
assets/fonts/           ← déposez vos Gotham .woff2 (voir LISEZMOI.txt)
assets/img/             ← déposez logo + photos (voir LISEZMOI.txt)
apps-script/            Formulaire → Gmail (voir INSTALLATION.md)
CNAME                   Domaine personnalisé (momentumcreativeprod.com)
```

## Mise en ligne — pas à pas

### 1. Créer le dépôt et pousser

```bash
cd mcp-site
git init
git add .
git commit -m "Site MCP v1"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/mcp-site.git
git push -u origin main
```

### 2. Activer GitHub Pages

Sur GitHub : **Settings → Pages → Source : Deploy from a branch →
Branch : `main` / `(root)` → Save**. Le site est en ligne en ~1 minute
sur `https://VOTRE_COMPTE.github.io/mcp-site/`.

### 3. Brancher le domaine momentumcreativeprod.com

Chez votre registrar (probablement Squarespace Domains actuellement) :

| Type  | Hôte | Valeur            |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | VOTRE_COMPTE.github.io |

Puis sur GitHub : **Settings → Pages → Custom domain :
`momentumcreativeprod.com` → Save**, et cochez **Enforce HTTPS**
une fois le certificat émis (quelques minutes à quelques heures).

> ⚠️ Ne coupez l'abonnement Squarespace qu'après avoir vérifié que le
> nouveau site répond bien sur le domaine, et après avoir récupéré
> toutes vos images hébergées chez eux.

### 4. Déposer les fontes Gotham

Copiez vos `.woff2` dans `assets/fonts/` avec les noms indiqués dans
`assets/fonts/LISEZMOI.txt`. Sans eux, le site s'affiche en Montserrat.

### 5. Activer le formulaire

Suivez `apps-script/INSTALLATION.md` (5 min) puis collez l'URL obtenue
dans `FORM_ENDPOINT` en tête de `assets/js/main.js`.

### 6. Remplacer les contenus d'exemple

- **Logo** : `assets/img/logo-horizontal-blanc.png`
- **Showreel** : bloc commenté `SHOWREEL` dans `index.html`
- **Réalisations** : cartes d'exemple dans `realisations.html`
  (mode d'emploi en commentaire dans le fichier). N'affichez un nom de
  client qu'avec son accord — en particulier pour les tournages réalisés
  en sous-traitance.
- **Équipe** : cartes dans `agence.html` (accord des personnes requis)
- **Mentions légales** : relire `mentions-legales.html` (capital, RCS…)

## Travailler en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```
