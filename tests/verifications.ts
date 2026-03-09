import { Page, expect } from '@playwright/test';
import { choisirLaTache } from './actions';

// ============================================================
// FONCTIONS DE VERIFICATION
// ============================================================

// Vérifier que la tâche est présente dans la liste
export async function verifierQueLaTacheEstPresente(page: Page, label: string) {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await expect(item).toBeVisible();
}

// Vérifier que la tâche est absente de la liste
export async function verifierQueLaTacheEstAbsente(page: Page, label: string) {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await expect(item).not.toBeVisible();
}

// Vérifier le nombre de tâches dans la liste
export async function verifierLeNombreDeTaches(page: Page, count: number) {
  await expect(page.locator('.todo-list li')).toHaveCount(count);
}

// Vérifier que la tâche n'est pas cochée
export async function verifierQueLaTacheNestPasCochee(page: Page, label: string) {
  const item = await choisirLaTache(page, label);
  await expect(item.locator('input[type="checkbox"]')).not.toBeChecked();
}

// Vérifier que la tâche est cochée
export async function verifierQueLaTacheEstCochee(page: Page, label: string) {
  const item = await choisirLaTache(page, label);
  await expect(item.locator('input[type="checkbox"]')).toBeChecked();
}

// Vérifier que l'icône (checkbox + toggle) est bien présente
export async function verifierQueLIconeEstPresente(page: Page, label: string) {
  const item = await choisirLaTache(page, label);
  await expect(item.locator('input[type="checkbox"]')).toBeVisible();
  await expect(item.locator('.toggle')).toBeVisible();
}