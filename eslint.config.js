import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	pluginReactQuery.configs.recommended,
	...tseslint.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			// '@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/consistent-type-imports': 'warn',
		},
	},
];

