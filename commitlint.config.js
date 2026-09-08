/**
 * Convention de commits Finéo — Conventional Commits.
 * Référence : docs/devops (spec §5). Format attendu :
 *
 *   <type>(<scope>): <description>
 *
 * Le scope est optionnel. La description est en français, à l'impératif,
 * en minuscules et sans point final.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Les 11 types autorisés par la spec §5.2. Tout autre type est refusé.
    'type-enum': [
      2,
      'always',
      [
        'feat', // nouvelle fonctionnalité utilisateur      → version mineure
        'fix', // correction de bug                        → version patch
        'perf', // amélioration de performance              → version patch
        'refactor', // réécriture sans changement de comportement
        'test', // ajout ou correction de tests
        'docs', // documentation seule
        'style', // formatage uniquement, jamais de logique
        'build', // Dockerfile, dépendances, outils de build
        'ci', // workflows GitHub Actions
        'chore', // configuration, tâches diverses
        'revert', // annulation d'un commit
      ],
    ],

    // En-tête complet (type + scope + description) limité à 72 caractères.
    'header-max-length': [2, 'always', 72],

    // La description est obligatoire et ne se termine jamais par un point.
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    // Le scope reste facultatif (décision d'équipe), mais s'il est présent
    // il doit être en minuscules.
    'scope-case': [2, 'always', 'lower-case'],
  },
};
