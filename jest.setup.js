// jest.setup.js
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ borderBoxSize: [{ inlineSize: 0, blockSize: 0 }] }]);
  }
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Add custom jest matchers
expect.extend({
  toHaveBeenCalledAfter(received, expected) {
    const receivedIndex = mock.calls.indexOf(received);
    const expectedIndex = mock.calls.indexOf(expected);
    return {
      pass: receivedIndex > expectedIndex,
      message: () =>
        `expected ${received} to have been called after ${expected}`,
    };
  },
});
