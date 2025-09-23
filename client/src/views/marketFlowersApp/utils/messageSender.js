export const handleOrderCreationAndGenerateMessage = (formData) => {
  const {
    bouquets,
    isSelfRecipient,
    anonymously,
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    deliveryZone,
    address,
    comment,
  } = formData;

  const bouquetLines = bouquets.map((b) => {
    return `${b.name}\nQuantité : ${b.quantity}\nTaille : ${b.size}\nPrix : ${b.total} €\n`;
  });

  const totalSum = bouquets.reduce((sum, b) => sum + b.total, 0);

  let message = `🧺 Nouvelle commande\n\n`;
  message += `🌸 Bouquets :\n${bouquetLines.join("\n")}`;
  message += `\n💰 Montant total : ${totalSum} €`;

  message += `\n\n👤 Destinataire : ${
    isSelfRecipient ? "Acheteur" : recipientName || "Non renseigné"
  }`;

  if (!isSelfRecipient) {
    message += `\n📞 Tél. du destinataire : ${
      recipientPhone || "Non renseigné"
    }`;
  }

  message += `\n\n🧑 Acheteur : ${senderName || "Non renseigné"}`;
  message += `\n📞 Tél. de l’acheteur : ${senderPhone || "Non renseigné"}`;
  message += `\n📦 Livraison : ${deliveryZone || "Non choisi"}`;
  message += `\n📍 Adresse : ${address || "Non renseignée"}`;

  if (anonymously) {
    message += `\n🙈 Anonyme`;
  }

  if (comment) {
    message += `\n📝 Commentaire : ${comment}`;
  }

  return message;
};

export const generateMessagePhoneContact = (phone) => {
  let message = `🧺 Demande de contact\n\n`;
  message += `\nNuméro de téléphone : ${phone}`;
  return message;
};

export const sendTelegramMessage = async (message) => {
  try {
    await fetch("/api/basket/senBasketInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    });
  } catch {}
};
