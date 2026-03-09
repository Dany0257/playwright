import { Page } from '@playwright/test';

// N:1.1 - Nommer la tâche
async function nommerLaTache(page: Page, label: string): Promise<void> {
  await page.getByPlaceholder('What needs to be done?').fill(label);
}

// N:1.2 - Ajouter à la fin de la liste
async function ajouterLaTacheALaListe(page: Page): Promise<void> {
  await page.keyboard.press('Enter');
}

// N:1 - Séquentiel : N:1.1 puis N:1.2
export async function ajouterUneTache(page: Page, label: string): Promise<void> {
  await nommerLaTache(page, label);
  await ajouterLaTacheALaListe(page);
}