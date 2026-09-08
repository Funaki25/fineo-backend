// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // Fichiers hors périmètre. En flat config, il n'existe plus de .eslintignore :
  // les exclusions se déclarent ici.
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'eslint.config.mjs'],
  },

  // Règles JavaScript de base (variables inutilisées, comparaisons douteuses...).
  eslint.configs.recommended,

  // Règles TypeScript AVEC analyse de types. C'est la variante « TypeChecked »
  // qui permet de détecter une promesse non attendue — impossible à voir en
  // analysant un fichier isolé, il faut le graphe de types du projet entier.
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        // Fait découvrir le tsconfig.json automatiquement, y compris pour les
        // fichiers de test qui dépendent d'un autre tsconfig.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Règles ajustées pour le contexte Finéo.
  {
    rules: {
      // Erreur, pas avertissement : un `await` oublié dans le moteur de calcul
      // produit un montant faux, pas un crash. Cf. spec §7.1.
      '@typescript-eslint/no-floating-promises': 'error',

      // NestJS impose des décorateurs et des types dynamiques ; `any` reste
      // toléré ponctuellement mais doit rester visible.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',

      // Autorise les variables et arguments préfixés d'un underscore.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // TOUJOURS EN DERNIER : éteint les règles de style d'ESLint pour laisser
  // Prettier seul maître de la forme. Placé avant, il serait réactivé
  // par les configurations suivantes.
  eslintConfigPrettier,
);
