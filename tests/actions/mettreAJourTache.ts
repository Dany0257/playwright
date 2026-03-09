import { Page } from '@playwright/test';
import { rechercherUneTache, StatutRecherche } from './rechercherTache';
import { choisirLaTache } from './choisirTache';
import { modifierLaTache, TypeModification } from './modifierTache';

// N:2 - Séquentiel : N:2.1 puis N:2.2 puis N:2.3
export async function mettreAJourUneTache(
  page: Page,
  statut: StatutRecherche,
  label: string,
  modification: TypeModification
): Promise<void> {
  await rechercherUneTache(page, statut);
  const tacheChoisie = await choisirLaTache(page, label);
  await modifierLaTache(page, tacheChoisie, modification);
}