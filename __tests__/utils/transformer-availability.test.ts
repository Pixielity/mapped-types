import { jest } from '@jest/globals'

jest.mock(
  'class-transformer',
  () => {
    return {}
  },
  { virtual: true },
)

describe('isClassTransformerAvailable', () => {
  let originalRequire: NodeRequire

  beforeEach(() => {
    originalRequire = require
    jest.resetModules()
  })

  afterEach(() => {
    global.require = originalRequire
  })

  it('should return true when class-transformer is available', () => {
    // Mock require to return a value for class-transformer
    ;(global as any).require = jest.fn((module) => {
      if (module === 'class-transformer') {
        return {}
      }
      return originalRequire(module as string)
    })

    // Re-import the module to use the mocked require
    // Using require here is necessary for testing dynamic imports
    const {
      isClassTransformerAvailable,
    } = require('../../src/utils/transformer-availability.utils')

    expect(isClassTransformerAvailable()).toBe(true)
  })
})
