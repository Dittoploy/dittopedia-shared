// --- 5. PETIT UTILITAIRE (Optionnel) ---
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR').format(date);
};