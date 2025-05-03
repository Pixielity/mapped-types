import { jest } from "@jest/globals"

jest.mock(
  "class-transformer",
  () => {
    return {}
  },
  { virtual: true },
)

describe("isClassTransformerAvailable", () => {
  let originalRequire: NodeRequire

  beforeEach(() => {
    originalRequire = require
    jest.resetModules()
  })

  afterEach(() => {
    global.require = originalRequire
  })

  it("should return true when class-transformer is available", () => {
    // Mock require to return a value for class-transformer
    ;(global as any).require = jest.fn((module) => {
      if (module === "class-transformer") {
        return {}
      }
      return originalRequire(module)
    })

    // Re-import the module to use the mocked require
    const { isClassTransformerAvailable } = require("../../utils/transformer-availability.utils")

    expect(isClassTransformerAvailable()).toBe(true)
  })

  it("should return false when class-transformer is not available", () => {
    // Mock require to throw an error for class-transformer
    ;(global as any).require = jest.fn((module) => {
      if (module === "class-transformer") {
        throw new Error("Module not found")
      }
      return originalRequire(module)
    })

    // Re-import the module to use the mocked require
    const { isClassTransformerAvailable } = require("../../utils/transformer-availability.utils")

    expect(isClassTransformerAvailable()).toBe(false)
  })
})
