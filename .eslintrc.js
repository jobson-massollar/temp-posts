module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest/globals": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
    ],
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: [
        "react",
        "jest",
    ],
    settings: {
        react: {
          version: "detect",
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
    }
}
