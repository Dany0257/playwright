import { Page } from '@playwright/test';

// N:2.3.1 - Supprimer la tâche
async function supprimerLaTache(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await item.hover();
  await item.getByRole('button', { name: '×' }).click();
}

// N:2.3.2.1 - Indiquer la tâche comme faite
async function indquerTacheCommeFaite(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await item.locator('input[type="checkbox"]').click();
}

// N:2.3.2.2 - Indiquer la tâche comme étant à faire
async function indquerTacheCommeAFaire(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await item.locator('input[type="checkbox"]').click();
}

// N:2.3.2 - Changer le statut (Alternatif)
async function changerLeStatutDeLaTache(
  page: Page,
  label: string,
  statut: 'faite' | 'aFaire'
): Promise<void> {
  if (statut === 'faite') {
    await indquerTacheCommeFaite(page, label);
  } else {
    await indquerTacheCommeAFaire(page, label);
  }
}

// N:2.3.3 - Modifier le nom de la tâche
async function modifierLeNomDeLaTache(page: Page, label: string, nouveauLabel: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await item.dblclick();
  await page.locator('input.edit').fill(nouveauLabel);
  await page.locator('input.edit').press('Enter');
}

// N:2.3 - Alternatif
export type TypeModification =
  | { type: 'supprimer' }
  | { type: 'changerStatut'; statut: 'faite' | 'aFaire' }
  | { type: 'renommer'; nouveauLabel: string };

export async function modifierLaTache(
  page: Page,
  label: string,
  modification: TypeModification
): Promise<void> {
  switch (modification.type) {
    case 'supprimer':
      await supprimerLaTache(page, label);
      break;
    case 'changerStatut':
      await changerLeStatutDeLaTache(page, label, modification.statut);
      break;
    case 'renommer':
      await modifierLeNomDeLaTache(page, label, modification.nouveauLabel);
      break;
  }
}