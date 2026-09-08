# Contribuer à Finéo

Guide court et opérationnel. Les justifications détaillées de chaque choix sont
dans la spécification DevOps de l'équipe.

## Mise en route

```bash
npm install     # installe aussi les hooks Git (script `prepare`)
npm run start:dev
```

⚠️ **Ne saute pas le `npm install`** : c'est lui qui active les vérifications
automatiques avant chaque commit. Sans lui, tes commits seront refusés à la
Pull Request au lieu de l'être immédiatement.

## Branches

`main` = production · `develop` = pré-production. **On ne pousse jamais
directement dessus**, tout passe par une Pull Request.

```
<type>/<numéro-issue>-<description-courte>

feat/12-connexion-email
fix/34-deduplication-import
ci/07-workflow-lint
```

Une branche part **toujours de `develop`**. Elle est supprimée automatiquement
après fusion.

## Messages de commit

Format **Conventional Commits**, description en **français**, à l'impératif,
en minuscules, **sans point final**, en-tête ≤ 72 caractères.

```
<type>(<scope>): <description>
```

Le scope est optionnel mais recommandé (`auth`, `import`, `quotes`,
`dashboard`, `ci`, `deps`…).

| Type       | Quand l'utiliser                           |
| ---------- | ------------------------------------------ |
| `feat`     | nouvelle fonctionnalité utilisateur        |
| `fix`      | correction de bug                          |
| `perf`     | amélioration de performance                |
| `refactor` | réécriture sans changement de comportement |
| `test`     | ajout ou correction de tests               |
| `docs`     | documentation seule                        |
| `style`    | formatage uniquement                       |
| `build`    | dépendances, Dockerfile, outils de build   |
| `ci`       | workflows GitHub Actions                   |
| `chore`    | configuration, tâches diverses             |
| `revert`   | annulation d'un commit                     |

```bash
✅ feat(auth): ajouter la connexion par email
✅ fix(import): dédupliquer les lignes d'un fichier réimporté
✅ feat(api)!: renommer le champ balance en value      # ! = rupture de compatibilité

❌ Initial commit          # pas de type
❌ feat:connexion-marie    # pas d'espace, et le prénom est déjà dans Git
❌ fix: bug                # ne dit pas ce qui est corrigé
```

**N'écris jamais ton prénom dans un message.** Git l'enregistre déjà :
`git shortlog -sn`, `git blame`, ou l'onglet _Insights → Contributors_.

**Un commit = un changement.** Trois modifications sans rapport → trois commits.

## Pull Requests

Le titre de la PR **suit la même convention** : avec le _squash and merge_, il
devient le message du commit sur `develop`.

- Assigne-toi la PR, et demande une relecture à quelqu'un d'autre.
- Une approbation et une CI verte sont nécessaires pour fusionner.

## Commandes

| Commande               | Rôle                                   |
| ---------------------- | -------------------------------------- |
| `npm run lint`         | ESLint — détecte les bugs              |
| `npm run lint:fix`     | corrige ce qui est corrigeable         |
| `npm run format`       | Prettier — met en forme                |
| `npm run format:check` | vérifie la mise en forme sans modifier |
| `npm run typecheck`    | `tsc --noEmit`                         |
| `npm test`             | tests unitaires (Vitest)               |
| `npm run test:cov`     | tests + couverture                     |

## Si un commit est refusé

C'est normal, c'est le but. Lis le message :

- `type may not be empty` → il manque `feat:`, `fix:`… en tête
- `subject may not be empty` → il manque l'espace après les deux-points
- `header-max-length` → message trop long, raccourcis à 72 caractères
- une erreur ESLint → lance `npm run lint:fix`, puis recommite

**Ne contourne pas avec `--no-verify`.** La CI refuserait la Pull Request de
toute façon, et tu aurais perdu le retour immédiat.
