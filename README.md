# TP Playwright – Tests de la TodoList

## Démarche suivie

### 1. Analyse du modèle de tâche

Avant d'écrire les tests, nous avons analysé le modèle de tâche fourni (arbre de tâches hiérarchique). Cet arbre décrit toutes les fonctionnalités de l'application TodoMVC Angular à tester, organisées en nœuds :

- **N:Racine** – Mettre à jour la liste des choses à faire
  - **N:1** – Ajouter une tâche *(séquentiel)*
    - **N:1.1** – Nommer la tâche
    - **N:1.2** – Ajouter une tâche à la fin de la liste
  - **N:2** – Mettre à jour une tâche existante *(séquentiel)*
    - **N:2.1** – Rechercher une tâche selon son statut *(alternatif)*
      - **N:2.1.1** – Rechercher parmi les tâches déjà réalisées
      - **N:2.1.2** – Rechercher parmi les tâches à faire
      - **N:2.1.3** – Rechercher dans toute la liste
    - **N:2.2** – Choisir la tâche
    - **N:2.3** – Modifier la tâche *(alternatif)*
      - **N:2.3.1** – Supprimer la tâche
      - **N:2.3.2** – Changer le statut de la tâche *(alternatif)*
        - **N:2.3.2.1** – Indiquer la tâche comme faite
        - **N:2.3.2.2** – Indiquer la tâche comme étant à faire
      - **N:2.3.3** – Modifier le nom de la tâche

### 2. Architecture en niveaux d'abstraction

Nous avons appliqué une séparation stricte en trois niveaux, inspirée du niveau C&T (Concepts & Techniques) :

#### `actions.ts` – Niveau C&T (actions utilisateur)

Contient toutes les **fonctions d'action** correspondant aux nœuds feuilles du modèle de tâche. Chaque fonction encapsule les interactions Playwright brutes (clics, fills, clavier) et est nommée en français métier pour correspondre directement à un nœud de l'arbre :

| Fonction | Nœud |
|---|---|
| `naviguerVersLaTodoList` | N:Racine |
| `nommerLaTache` | N:1.1 |
| `ajouterUneTacheALaFinDeLaListe` | N:1.2 |
| `rechercherParmiLesTachesDéjàRealisées` | N:2.1.1 |
| `rechercherParmiLesTachesAFaire` | N:2.1.2 |
| `rechercherDansTouteLaListe` | N:2.1.3 |
| `choisirLaTache` | N:2.2 (helper interne) |
| `supprimerLaTache` | N:2.3.1 |
| `changerLeStatutDeLaTache` | N:2.3.2 (alternatif) |
| `indiquerLaTacheCommeFaite` | N:2.3.2.1 |
| `indiquerLaTacheCommeAFaire` | N:2.3.2.2 |
| `modifierLeNomDeLaTache` | N:2.3.3 |

#### `verifications.ts` – Niveau C&T (assertions)

Contient toutes les **fonctions de vérification** qui encapsulent les assertions Playwright (`expect`). Elles sont également nommées en français et lisibles comme des phrases naturelles :

- `verifierLeNombreDeTaches`
- `verifierQueLaTacheEstPresente` / `verifierQueLaTacheEstAbsente`
- `verifierQueLaTacheEstCochee` / `verifierQueLaTacheNestPasCochee`
- `verifierQueLIconeEstPresente`

#### `scenarios.spec.ts` – Niveau scénario (cas de test)

Contient les **cas de test** organisés en `test.describe` correspondant aux nœuds du modèle. Les scénarios sont écrits **uniquement** avec des appels aux fonctions de haut niveau d'`actions.ts` et `verifications.ts` — aucun sélecteur CSS ni API Playwright brute n'apparaît à ce niveau.

### 3. Couverture du modèle de tâche

Tous les nœuds de l'arbre de tâches sont couverts par au moins un cas de test :

| Nœud | Cas de test |
|---|---|
| N:1.1 + N:1.2 | Nommer et ajouter une tâche à la fin de la liste |
| N:2.3.1 | Supprimer une tâche |
| N:2.3.2.1 | Indiquer une tâche comme faite |
| N:2.3.2.2 | Indiquer une tâche comme étant à faire |
| N:2.3.3 | Modifier le nom d'une tâche |
| N:2.1.1 | Rechercher parmi les tâches réalisées |
| N:2.1.2 | Rechercher parmi les tâches à faire |
| N:2.1.3 | Rechercher dans toute la liste |

**Total : 16 tests, tous passants.**

### 4. Lisibilité des cas de test

Les cas de test sont rédigés comme des **scénarios en français naturel**. Exemple :

```typescript
test('N:2.3.3 — Modifier le nom d\'une tâche', async ({ page }) => {
    await modifierLeNomDeLaTache(page, 'Tâche initiale', 'Tâche modifiée');

    await verifierQueLaTacheEstPresente(page, 'Tâche modifiée');
    await verifierQueLaTacheEstAbsente(page, 'Tâche initiale');
});
```

Aucun sélecteur CSS ni détail d'implémentation ne transparaît au niveau des scénarios, ce qui les rend lisibles par un non-technicien.

### 5. Lancer les tests

```bash
npx playwright test scenarios.spec.ts
```

Pour voir le rapport HTML :

```bash
npx playwright show-report
```
