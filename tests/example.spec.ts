import { test, expect } from '@playwright/test';
import { ajouterUneTache } from './actions/ajouterTache';
import { mettreAJourUneTache } from './actions/mettreAJourTache';
import { rechercherUneTache } from './actions/rechercherTache';
import {
  verifierNombreItems,
  verifierItemPresent,
  verifierItemAbsent,
  verifierItemCoche,
  verifierItemNonCoche,
  verifierReferenceItemConstante,
  attendreItemVisible
} from './verifications/tache.verifications';

test.beforeEach(async ({ page }) => {
  await page.goto('https://todomvc.com/examples/angular/dist/browser/#/all', {
    timeout: 60000
  });
});

// Scénario N:1
test('N:1 - Ajouter une tâche et vérifier son état initial', async ({ page }) => {
  await ajouterUneTache(page, 'ma tache');
  await verifierNombreItems(page, 1);
  await verifierItemPresent(page, 'ma tache');
  await verifierItemNonCoche(page, 'ma tache');
});

// Scénario N:2 + N:2.1.3 + N:2.3.1
test('N:2.3.1 - Supprimer une tâche depuis toute la liste', async ({ page }) => {
  await ajouterUneTache(page, 'tache a supprimer');
  await mettreAJourUneTache(page, 'toutes', 'tache a supprimer', { type: 'supprimer' });
  await verifierNombreItems(page, 0);
  await verifierItemAbsent(page, 'tache a supprimer');
});

// Scénario N:2 + N:2.1.2 + N:2.3.2.1
test('N:2.3.2.1 - Marquer une tâche active comme faite', async ({ page }) => {
  await ajouterUneTache(page, 'tache a cocher');
  await mettreAJourUneTache(page, 'aFaire', 'tache a cocher', { type: 'changerStatut', statut: 'faite' });
  await rechercherUneTache(page, 'toutes');
  // attendre que l'item soit visible dans la vue "toutes"
  await page.locator('.todo-list li').filter({ hasText: 'tache a cocher' }).waitFor({ state: 'visible' });
  await verifierItemCoche(page, 'tache a cocher');
});

// Scénario N:2 + N:2.1.1 + N:2.3.2.2
test('N:2.3.2.2 - Décocher une tâche réalisée', async ({ page }) => {
  await ajouterUneTache(page, 'tache a decocher');
  // on coche depuis "toutes"
  await mettreAJourUneTache(page, 'toutes', 'tache a decocher', { type: 'changerStatut', statut: 'faite' });
  // on décoche depuis "realisee" (Completed) — la tâche y est encore visible
  await mettreAJourUneTache(page, 'realisee', 'tache a decocher', { type: 'changerStatut', statut: 'aFaire' });
  // on revient sur "toutes" pour vérifier
  await rechercherUneTache(page, 'toutes');
  await attendreItemVisible(page, 'tache a decocher');
  await verifierItemNonCoche(page, 'tache a decocher');
});

// Scénario N:2 + N:2.1.3 + N:2.3.3
test('N:2.3.3 - Modifier le nom d\'une tâche', async ({ page }) => {
  await ajouterUneTache(page, 'ancien nom');
  await mettreAJourUneTache(page, 'toutes', 'ancien nom', { type: 'renommer', nouveauLabel: 'nouveau nom' });
  await verifierItemPresent(page, 'nouveau nom');
  await verifierItemAbsent(page, 'ancien nom');
  await verifierReferenceItemConstante(page, 'nouveau nom');
});