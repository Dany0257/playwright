import { Page } from '@playwright/test';

// N:2.2 - Choisir la tâche (identification, pas d'interaction)
export async function choisirLaTache(page: Page, label: string): Promise<string> {
  return label;
}