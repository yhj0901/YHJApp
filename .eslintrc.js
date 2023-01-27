module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'no-unused-vars': 'off',
    'import/extensions': ['off'],
    'import/no-unresolved': 'off',
    'no-console': 0,
    // React
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],
    'react/destructuring-assignment': [0, 'always'],
    camelcase: 'off',
    'no-undef': 'off',
    'no-debugger': 'off',
  },
  // 다른 config를 사용하더라도 prettier를 맨 마지막에 넣어야 모든 중복 규칙을 비활성화 시킬 수 있다.
};
