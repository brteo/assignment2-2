module.exports = {
	parserOptions: {
		ecmaVersion: 2020, // Use the latest ecmascript standard
		sourceType: 'module', // Allows using import/export statements
		ecmaFeatures: {
			jsx: true // Enable JSX since we're using React
		}
	},
	settings: {
		react: {
			version: 'detect' // Automatically detect the react version
		}
	},
	env: {
		browser: true, // Enables browser globals like window and document
		amd: true, // Enables require() and define() as global variables as per the amd spec.
		node: true, // Enables Node.js global variables and Node.js scoping.
		jest: true // Enable Jest test
	},
	plugins: ['react', 'prettier', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'airbnb',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended'
	],
	rules: {
		'prettier/prettier': ['error'],
		'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // allow jsx syntax in js files
		'max-len': ['error', { code: 140, ignoreComments: true }],
		'react/destructuring-assignment': ['off'], // disable forse restructuring assignment (props.status) => const {status} = props
		'react/prop-types': ['off'],
		'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
		'prefer-template': ['off'], // string templates
		'no-console': ['off']
	}
};

/*
* OLD RULES
		'prefer-promise-reject-errors': ['off'],
		'no-return-assign': ['off'],
		'no-console': ['off'],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'prefer-template': ['off'],
		'no-nested-ternary': ['off'],
		'no-plusplus': ['off'],
		'react/prop-types': ['warn'],
		'react/prefer-stateless-function': ['off'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/prop-types': ['off'],
		'react/destructuring-assignment': ['off'],
		'react/display-name': ['off'],
		'react/jsx-props-no-spreading': ['off'],
		'react-hooks/exhaustive-deps': 'warn'

*/
