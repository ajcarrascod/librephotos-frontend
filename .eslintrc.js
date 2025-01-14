module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  plugins: ["prettier"],
  rules: {
    "spaced-comment": "warn",
    "prefer-template": "warn",
    "func-names": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "block-scoped-var": "warn",
    "vars-on-top": "warn",
    eqeqeq: "warn",
    radix: "warn",
    "arrow-body-style": "warn",
    "prefer-destructuring": "warn",
    "max-classes-per-file": "warn",
    "no-unneeded-ternary": "warn",
    "no-await-in-loop": "warn",
    "no-restricted-syntax": "warn",
    "no-console": "off",
    "no-bitwise": "warn",
    "no-process-exit": "off",
    "no-void": "off",
    "no-plusplus": "warn",
    "no-param-reassign": "warn",
    "no-underscore-dangle": "warn",
    "no-return-assign": "warn",
    "no-var": "warn",
    "no-class-assign": "warn",
    "no-nested-ternary": "warn",
    "no-prototype-builtins": "warn",
    "no-else-return": "warn",
    "import/no-named-as-default": "warn",
    "import/prefer-default-export": "off",
    "import/no-default-export": "warn",
    "import/no-cycle": "warn",
    "import/named": "warn",
    "import/no-mutable-exports": "warn",
    "jsx-a11y/control-has-associated-label": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "react/function-component-definition": "warn",
    "react/self-closing-comp": "warn",
    "react/no-deprecated": "warn",
    "react/jsx-no-bind": [
      "warn",
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: true,
      },
    ],
    "react/prop-types": "warn",
    "react/destructuring-assignment": "warn",
    "react/jsx-filename-extension": "warn",
    "react/prefer-stateless-function": "warn",
    "react/no-unused-state": "warn",
    "react/sort-comp": "warn",
    "react/state-in-constructor": "warn",
    "react/no-access-state-in-setstate": "warn",
    "react/jsx-props-no-spreading": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unused-class-component-methods": "warn",
    "react/no-array-index-key": "warn",
    "react/no-unescaped-entities": "warn",
    "react/require-default-props": "warn",
    "react/no-unstable-nested-components": "warn",
    "@typescript-eslint/no-use-before-define": "warn",
    "@typescript-eslint/default-param-last": "warn",
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-redeclare": "warn",
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: true }],
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
