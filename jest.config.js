module.exports = {
  transform: {
    "^.+\\.jsx?$": "<rootDir>/jest.preprocess.js"
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js"
  },
  testPathIgnorePatterns: [
    "__coverage__",
    "__tests__/data",
    ".cache",
    "content",
    "data",
    "node_modules",
    "public",
    "third-parties"
  ],
  watchPathIgnorePatterns: ["content"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: ""
  },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/loadershim.js", "<rootDir>/setupTests.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/*.{js,jsx}"
  ],
  coverageDirectory: "__coverage__"
}
