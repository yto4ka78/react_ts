export const validateFormData = (formData) => {
  const {
    bouquets,
    isSelfRecipient,
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    deliveryZone,
    address,
  } = formData;

  const errors = [];
  if (!bouquets || bouquets.length === 0)
    errors.push("Vous n’avez ajouté aucun bouquet");
  if (!senderName.trim()) errors.push("Indiquez le nom de l’acheteur");
  if (!senderPhone.trim()) errors.push("Indiquez le téléphone de l’acheteur");

  if (!isSelfRecipient) {
    if (!recipientName.trim()) errors.push("Indiquez le nom du destinataire");
    if (!recipientPhone.trim())
      errors.push("Indiquez le téléphone du destinataire");
  }

  if (!deliveryZone) errors.push("Choisissez une zone de livraison");
  if (!deliveryZone === "pickup") {
    if (!address.trim()) errors.push("Indiquez l’adresse de livraison");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return true;
  }
};
