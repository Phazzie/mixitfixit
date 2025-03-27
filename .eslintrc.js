module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'solid-principles'],
    rules: {
        'solid-principles/single-responsibility': 'error',
        'solid-principles/interface-segregation': 'error',
        'max-lines-per-function': ['error', { max: 20 }],
        'max-classes-per-file': ['error', 1],
        'max-methods-per-class': ['error', 3],
        'complexity': ['error', 5]
    },
    overrides: [{
        files: ['**/*.test.ts'],
        rules: {
            'max-lines-per-function': 'off'
        }
    }]
}