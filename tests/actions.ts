import { Page } from '@playwright/test';

const URL = 'https://todomvc.com/examples/angular/dist/browser/#/all';

// ============================================================
// N:Racine - Navigation
// ============================================================

export async function naviguerVersLaTodoList(page: Page) {
    await page.goto(URL);
}

// ============================================================
// N:1 - Ajouter une tâche
// ============================================================

// N:1.1 - Nommer la tâche
export async function nommerLaTache(page: Page, label: string) {
    await page.getByPlaceholder('What needs to be done?').fill(label);
}

// N:1.2 - Ajouter une tâche à la fin de la liste
export async function ajouterUneTacheALaFinDeLaListe(page: Page) {
    await page.getByPlaceholder('What needs to be done?').press('Enter');
}

// ============================================================
// N:2.1 - Rechercher une tâche selon son statut
// ============================================================

// N:2.1.1 - Rechercher parmi les tâches déjà réalisées
export async function rechercherParmiLesTachesDéjàRealisées(page: Page) {
    await page.getByRole('link', { name: 'Completed' }).click();
}

// N:2.1.2 - Rechercher parmi les tâches à faire
export async function rechercherParmiLesTachesAFaire(page: Page) {
    await page.getByRole('link', { name: 'Active' }).click();
}

// N:2.1.3 - Rechercher dans toute la liste
export async function rechercherDansTouteLaListe(page: Page) {
    await page.getByRole('link', { name: 'All' }).click();
}

// ============================================================
// N:2.2 - Choisir la tâche
// ============================================================

export async function choisirLaTache(page: Page, label: string) {
    return page.locator('.todo-list li').filter({ hasText: label });
}

// ============================================================
// N:2.3 - Modifier la tâche
// ============================================================

// N:2.3.1 - Supprimer la tâche
export async function supprimerLaTache(page: Page, label: string) {
    const item = await choisirLaTache(page, label);
    await item.hover();
    await item.locator('.destroy').click();
}


// N:2.3.2.1 - Indiquer la tâche comme faite
export async function indiquerLaTacheCommeFaite(page: Page, label: string) {
    const item = await choisirLaTache(page, label);
    await item.locator('input[type="checkbox"]').check();
}

// N:2.3.2.2 - Indiquer la tâche comme étant à faire
export async function indiquerLaTacheCommeAFaire(page: Page, label: string) {
    const item = await choisirLaTache(page, label);
    await item.locator('input[type="checkbox"]').uncheck();
}

// N:2.3.3 - Modifier le nom de la tâche
export async function modifierLeNomDeLaTache(page: Page, ancienLabel: string, nouveauLabel: string) {
    const item = await choisirLaTache(page, ancienLabel);
    await item.dblclick();
    const editInput = item.locator('input.edit');
    await editInput.clear();
    await editInput.fill(nouveauLabel);
    await editInput.press('Enter');
}