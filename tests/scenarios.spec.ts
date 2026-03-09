import { test } from '@playwright/test';

import {
    naviguerVersLaTodoList,
    nommerLaTache,
    ajouterUneTacheALaFinDeLaListe,
    supprimerLaTache,
    indiquerLaTacheCommeFaite,
    indiquerLaTacheCommeAFaire,
    modifierLeNomDeLaTache,
    rechercherParmiLesTachesDéjàRealisées,
    rechercherParmiLesTachesAFaire,
    rechercherDansTouteLaListe,
} from './actions';

import {
    verifierLeNombreDeTaches,
    verifierQueLaTacheEstPresente,
    verifierQueLaTacheEstAbsente,
    verifierQueLIconeEstPresente,
    verifierQueLaTacheNestPasCochee,
    verifierQueLaTacheEstCochee,
} from './verifications';

// ============================================================
// N:1 - Ajouter une tâche
// ============================================================

test.describe('N:1 - Ajouter une tâche', () => {

    test('N:1.1 + N:1.2 — Nommer et ajouter une tâche à la fin de la liste', async ({ page }) => {
        await naviguerVersLaTodoList(page);

        await nommerLaTache(page, 'Ma tâche de test');
        await ajouterUneTacheALaFinDeLaListe(page);

        await verifierLeNombreDeTaches(page, 1);
        await verifierQueLaTacheEstPresente(page, 'Ma tâche de test');
        await verifierQueLIconeEstPresente(page, 'Ma tâche de test');
        await verifierQueLaTacheNestPasCochee(page, 'Ma tâche de test');
    });

});

// ============================================================
// N:2 - Mettre à jour une tâche existante
// ============================================================

test.describe('N:2 - Mettre à jour une tâche existante', () => {

    test.beforeEach(async ({ page }) => {
        await naviguerVersLaTodoList(page);
        await nommerLaTache(page, 'Tâche initiale');
        await ajouterUneTacheALaFinDeLaListe(page);
    });

    // N:2.3.1 - Supprimer la tâche
    test('N:2.3.1 — Supprimer une tâche', async ({ page }) => {
        await supprimerLaTache(page, 'Tâche initiale');

        await verifierLeNombreDeTaches(page, 0);
        await verifierQueLaTacheEstAbsente(page, 'Tâche initiale');
    });


    // N:2.3.2.1 - Indiquer la tâche comme faite
    test('N:2.3.2.1 — Indiquer une tâche comme faite', async ({ page }) => {
        await indiquerLaTacheCommeFaite(page, 'Tâche initiale');

        await verifierQueLaTacheEstCochee(page, 'Tâche initiale');
    });

    // N:2.3.2.2 - Indiquer la tâche comme étant à faire
    test('N:2.3.2.2 — Indiquer une tâche comme étant à faire', async ({ page }) => {
        await indiquerLaTacheCommeFaite(page, 'Tâche initiale');
        await indiquerLaTacheCommeAFaire(page, 'Tâche initiale');

        await verifierQueLaTacheNestPasCochee(page, 'Tâche initiale');
    });

    // N:2.3.3 - Modifier le nom de la tâche
    test('N:2.3.3 — Modifier le nom d\'une tâche', async ({ page }) => {
        await modifierLeNomDeLaTache(page, 'Tâche initiale', 'Tâche modifiée');

        await verifierQueLaTacheEstPresente(page, 'Tâche modifiée');
        await verifierQueLaTacheEstAbsente(page, 'Tâche initiale');
    });

    // N:2.1.1 - Rechercher parmi les tâches réalisées
    test('N:2.1.1 — Rechercher parmi les tâches réalisées', async ({ page }) => {
        await indiquerLaTacheCommeFaite(page, 'Tâche initiale');
        await rechercherParmiLesTachesDéjàRealisées(page);

        await verifierLeNombreDeTaches(page, 1);
        await verifierQueLaTacheEstPresente(page, 'Tâche initiale');
    });

    // N:2.1.2 - Rechercher parmi les tâches à faire
    test('N:2.1.2 — Rechercher parmi les tâches à faire', async ({ page }) => {
        await indiquerLaTacheCommeFaite(page, 'Tâche initiale');
        await rechercherParmiLesTachesAFaire(page);

        await verifierLeNombreDeTaches(page, 0);
    });

    // N:2.1.3 - Rechercher dans toute la liste
    test('N:2.1.3 — Rechercher dans toute la liste', async ({ page }) => {
        await rechercherDansTouteLaListe(page);

        await verifierLeNombreDeTaches(page, 1);
        await verifierQueLaTacheEstPresente(page, 'Tâche initiale');
    });

});