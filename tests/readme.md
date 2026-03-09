# Tests Playwright - TodoMVC

## Démarche

### 1. Modèle de tâche
Nous avons utilisé le modèle CTT (ConcurTaskTree) comme base de spécification.
Ce modèle décrit hiérarchiquement les actions possibles sur la TodoList :

- **N:Racine** - Mettre à jour la liste (Alternatif)
  - **N:1** - Ajouter une tâche (Séquentiel)
    - **N:1.1** - Nommer la tâche (Élémentaire)
    - **N:1.2** - Ajouter à la fin de la liste (Élémentaire)
  - **N:2** - Mettre à jour une tâche déjà présente (Séquentiel)
    - **N:2.1** - Rechercher une tâche selon son statut (Alternatif)
      - **N:2.1.1** - Rechercher parmi les tâches réalisées (Élémentaire)
      - **N:2.1.2** - Rechercher parmi les tâches à faire (Élémentaire)
      - **N:2.1.3** - Rechercher dans toute la liste (Élémentaire)
    - **N:2.2** - Choisir la tâche (Élémentaire)
    - **N:2.3** - Modifier la tâche (Alternatif)
      - **N:2.3.1** - Supprimer la tâche (Élémentaire)
      - **N:2.3.2** - Changer le statut de la tâche (Alternatif)
        - **N:2.3.2.1** - Indiquer la tâche comme faite (Élémentaire)
        - **N:2.3.2.2** - Indiquer la tâche comme étant à faire (Élémentaire)
      - **N:2.3.3** - Modifier le nom de la tâche (Élémentaire)

### 2. Fonctions d'action
Chaque nœud du modèle correspond à une fonction dans le dossier `tests/actions/` :

- Les **tâches élémentaires** interagissent directement avec l'IHM (sélecteurs, clics, saisie clavier)
- Les **tâches composites séquentielles** orchestrent leurs sous-tâches dans l'ordre
- Les **tâches composites alternatives** utilisent un switch/if selon le contexte

| Fichier | Nœud | Type |
|---|---|---|
| `ajouterTache.ts` | N:1 | Composite séquentiel |
| `rechercherTache.ts` | N:2.1 | Composite alternatif |
| `choisirTache.ts` | N:2.2 | Élémentaire |
| `modifierTache.ts` | N:2.3 | Composite alternatif |
| `mettreAJourTache.ts` | N:2 | Composite séquentiel |

### 3. Fonctions de vérification
Définies dans `tests/verifications/tache.verifications.ts` à deux niveaux :

- **Niveau C&T** : observations sur l'état de l'IHM
  - `verifierNombreItems` — la liste contient-elle le bon nombre d'items ?
  - `verifierItemPresent` — un item avec ce label est-il affiché ?
  - `verifierItemAbsent` — un item avec ce label est-il absent ?
  - `verifierItemCoche` — la tâche est-elle cochée ?
  - `verifierItemNonCoche` — la tâche est-elle non cochée ?
- **Niveau technique** : stabilité du DOM
  - `verifierReferenceItemConstante` — l'item avec le nouveau label est-il unique et visible après modification ?

### 4. Scénarios de test
Les scénarios dans `tests/example.spec.ts` utilisent exclusivement les fonctions de haut niveau.
Chaque test est indépendant grâce au `beforeEach` qui recharge la page depuis zéro.
Chaque scénario couvre un chemin du modèle CTT.

| Scénario | Chemin couvert |
|---|---|
| N:1 - Ajouter une tâche | N:1 → N:1.1 → N:1.2 |
| N:2.3.1 - Supprimer une tâche | N:2 → N:2.1.3 → N:2.2 → N:2.3.1 |
| N:2.3.2.1 - Marquer une tâche comme faite | N:2 → N:2.1.2 → N:2.2 → N:2.3.2.1 |
| N:2.3.2.2 - Décocher une tâche réalisée | N:2 → N:2.1.1 → N:2.2 → N:2.3.2.2 |
| N:2.3.3 - Modifier le nom d'une tâche | N:2 → N:2.1.3 → N:2.2 → N:2.3.3 |

## Structure du projet
```
tests/
├── example.spec.ts
├── actions/
│   ├── ajouterTache.ts
│   ├── mettreAJourTache.ts
│   ├── rechercherTache.ts
│   ├── choisirTache.ts
│   └── modifierTache.ts
└── verifications/
    └── tache.verifications.ts
```

## Lancer les tests
```bash
npx playwright test
```

Pour voir le rapport HTML :
```bash
npx playwright show-report
```