import { Page } from '@playwright/test';

export type StatutRecherche = 'realisee' | 'aFaire' | 'toutes';

// N:2.1.1 - Rechercher parmi les tâches réalisées
async function rechercherParmiRealisees(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Completed' }).click();
}

// N:2.1.2 - Rechercher parmi les tâches à faire
async function rechercherParmiAFaire(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Active' }).click();
}

// N:2.1.3 - Rechercher dans toute la liste
async function rechercherDansTouteLaListe(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'All' }).click();
}

// N:2.1 - Alternatif : une branche selon le statut
export async function rechercherUneTache(page: Page, statut: StatutRecherche): Promise<void> {
  switch (statut) {
    case 'realisee':
      await rechercherParmiRealisees(page);
      break;
    case 'aFaire':
      await rechercherParmiAFaire(page);
      break;
    case 'toutes':
      await rechercherDansTouteLaListe(page);
      break;
  }
}