// module.exports = {
//   testEnvironment: 'node',
//   roots: ['<rootDir>/test'],
//   testMatch: ['**/*.test.ts'],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest'
//   }
// };

const tsPreset = require('ts-jest/jest-preset');
const dynamoDbPreset = require('@shelf/jest-dynamodb/jest-preset');

module.exports = {
    ...tsPreset,
    ...dynamoDbPreset,
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    coverageReporters: ["html", "text"],
};
