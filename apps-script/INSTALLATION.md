# Formulaire de contact — Installation (Google Apps Script + Gmail)

Le formulaire du site envoie les demandes directement dans votre boîte Gmail,
gratuitement, sans serveur. Configuration : **environ 5 minutes**.

## Étapes

1. **Ouvrez** https://script.google.com avec le compte Google qui gère
   `contact@momentumcreativeprod.com` (ou celui qui doit recevoir les demandes).

2. Cliquez sur **« Nouveau projet »**.

3. **Supprimez** le contenu du fichier `Code.gs` affiché, puis **collez**
   l'intégralité du fichier `Code.gs` de ce dossier.

4. Vérifiez la première ligne : `DESTINATAIRE` doit être l'adresse qui
   recevra les demandes.

5. En haut à droite : **Déployer → Nouveau déploiement**.

6. Cliquez sur l'engrenage ⚙️ → choisissez **« Application Web »**, puis :
   - **Description** : `Formulaire site MCP`
   - **Exécuter en tant que** : `Moi`
   - **Qui a accès** : `Tout le monde`  ← indispensable

7. Cliquez **Déployer**, autorisez l'accès quand Google le demande
   (écran « application non vérifiée » : *Paramètres avancés → Accéder au projet*
   — c'est votre propre script, c'est normal).

8. **Copiez l'URL** qui se termine par `/exec`.

9. Ouvrez `assets/js/main.js` dans le site et collez l'URL :

   ```js
   const FORM_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
   ```

10. Commitez/poussez → testez le formulaire en ligne. Le message arrive
    dans votre boîte avec **Répondre à** réglé sur l'e-mail du prospect :
    vous répondez d'un clic.

## Plan B : Formspree

Si vous préférez Formspree :
1. Créez un formulaire sur https://formspree.io (offre gratuite : 50 envois/mois)
2. Collez l'URL fournie (`https://formspree.io/f/xxxxxxx`) dans `FORM_ENDPOINT`
   de `assets/js/main.js`. Rien d'autre à changer.

## En cas de modification du script

Après toute modification de `Code.gs`, refaites **Déployer → Gérer les
déploiements → ✏️ Modifier → Version : Nouvelle version → Déployer**
(l'URL reste la même).
