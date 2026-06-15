/**
 * MOMENTUM CREATIVE PRODUCTIONS — Réception du formulaire de contact
 * À déployer dans Google Apps Script (voir INSTALLATION.md)
 *
 * Reçoit les soumissions du formulaire du site et envoie un e-mail
 * via votre compte Gmail à l'adresse DESTINATAIRE.
 */

const DESTINATAIRE = "contact@momentumcreativeprod.com"; // ← votre boîte de réception

function doPost(e) {
  try {
    const p = e.parameter || {};

    // Anti-spam : si le champ caché "website" est rempli, c'est un robot
    if (p.website) {
      return ContentService.createTextOutput("OK");
    }

    // Validation minimale
    if (!p.nom || !p.email || !p.message) {
      return ContentService.createTextOutput("MISSING_FIELDS");
    }

    const sujet =
      "[Site MCP] " + (p.projet || "Demande de contact") + " — " + p.nom;

    const corps = [
      "Nouvelle demande reçue via momentumcreativeprod.com",
      "",
      "Nom        : " + p.nom,
      "Société    : " + (p.societe || "—"),
      "E-mail     : " + p.email,
      "Téléphone  : " + (p.telephone || "—"),
      "Projet     : " + (p.projet || "—"),
      "Budget     : " + (p.budget || "À définir"),
      "",
      "Message :",
      "----------------------------------------",
      p.message,
      "----------------------------------------",
      "",
      "Reçu le " +
        Utilities.formatDate(new Date(), "Europe/Paris", "dd/MM/yyyy 'à' HH:mm"),
    ].join("\n");

    MailApp.sendEmail({
      to: DESTINATAIRE,
      replyTo: p.email,
      subject: sujet,
      body: corps,
    });

    return ContentService.createTextOutput("OK");
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err);
  }
}
