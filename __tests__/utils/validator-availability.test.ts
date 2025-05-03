import { jest } from '@jest/globals'

jest.mock(
  'class-validator',
  () => {
    return {}
  },
  { virtual: true },
)

describe('isClassValidatorAvailable', () => {
  let originalRequire: NodeRequire

  beforeEach(() => {
    originalRequire = require
    jest.resetModules()
  })

  afterEach(() => {
    global.require = originalRequire
  })

  it('should return true when class-validator is available', () => {
    // Mock require to return a value for class-validator
    ;(global as any).require = jest.fn((module) => {
      if (module === 'class-validator') {
        return {}
      }
      return originalRequire(module as string)
    })

    // Re-import the module to use the mocked require
    // Using require here is necessary for testing dynamic imports
    const { isClassValidatorAvailable } = require('../../src/utils/validator-availability.utils')

    expect(isClassValidatorAvailable()).toBe(true)
  })
})
