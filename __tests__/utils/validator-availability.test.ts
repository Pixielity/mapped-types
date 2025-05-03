import { jest } from "@jest/globals"

jest.mock(
  "class-validator",
  () => {
    return {}
  },
  { virtual: true },
)

describe("isClassValidatorAvailable", () => {
  let originalRequire: NodeRequire

  beforeEach(() => {
    originalRequire = require
    jest.resetModules()
  })

  afterEach(() => {
    global.require = originalRequire
  })

  it("should return true when class-validator is available", () => {
    // Mock require to return a value for class-validator
    ;(global as any).require = jest.fn((module) => {
      if (module === "class-validator") {
        return {}
      }
      return originalRequire(module)
    })

    // Re-import the module to use the mocked require
    const { isClassValidatorAvailable } = require("../../utils/validator-availability.utils")

    expect(isClassValidatorAvailable()).toBe(true)
  })

  it("should return false when class-validator is not available", () => {
    // Mock require to throw an error for class-validator
    ;(global as any).require = jest.fn((module) => {
      if (module === "class-validator") {
        throw new Error("Module not found")
      }
      return originalRequire(module)
    })

    // Re-import the module to use the mocked require
    const { isClassValidatorAvailable } = require("../../utils/validator-availability.utils")

    expect(isClassValidatorAvailable()).toBe(false)
  })
})
