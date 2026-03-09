import { Page, expect } from '@playwright/test';

// Niveau C&T - La liste a-t-elle le bon nombre d'items ?
export async function verifierNombreItems(page: Page, count: number): Promise<void> {
  await expect(page.locator('.todo-list li')).toHaveCount(count);
}

// Niveau C&T - L'item avec ce label est-il présent ?
export async function verifierItemPresent(page: Page, label: string): Promise<void> {
  await expect(page.locator('.todo-list li')).toContainText(label);
}

// Niveau C&T - L'item est-il absent ? (fonctionne même si la liste est vide)
export async function verifierItemAbsent(page: Page, label: string): Promise<void> {
  const count = await page.locator('.todo-list li').count();
  if (count === 0) return;
  await expect(page.locator('.todo-list li')).not.toContainText(label);
}

// Niveau C&T - La tâche est-elle cochée ?
export async function verifierItemCoche(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await expect(item.locator('input[type="checkbox"]')).toBeChecked();
}

// Niveau C&T - La tâche est-elle non cochée ?
export async function verifierItemNonCoche(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await expect(item.locator('input[type="checkbox"]')).not.toBeChecked();
}

// Niveau technique - L'item avec le nouveau label est-il bien unique et visible ?
export async function verifierReferenceItemConstante(page: Page, label: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: label });
  await expect(item).toBeVisible();
  await expect(item).toHaveCount(1);
}

// Niveau technique - Attendre qu'un item soit visible dans la vue courante
export async function attendreItemVisible(page: Page, label: string): Promise<void> {
  await page.locator('.todo-list li').filter({ hasText: label }).waitFor({ state: 'visible' });
}