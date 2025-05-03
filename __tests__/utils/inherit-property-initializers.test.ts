import { inheritPropertyInitializers } from '../../src/utils/inherit-property-initializers.utils'

describe('inheritPropertyInitializers', () => {
  class SourceClass {
    stringProp = 'default string'
    numberProp = 42
    booleanProp = true
    undefinedProp: string | undefined = undefined
  }

  it('should copy property initializers from source class to target object', () => {
    const target: Record<string, any> = {}

    inheritPropertyInitializers(target, SourceClass)

    expect(target.stringProp).toBe('default string')
    expect(target.numberProp).toBe(42)
    expect(target.booleanProp).toBe(true)
    expect(target.undefinedProp).toBeUndefined()
  })

  it('should not overwrite existing properties in target object', () => {
    const target: Record<string, any> = {
      stringProp: 'existing value',
      numberProp: 100,
    }

    inheritPropertyInitializers(target, SourceClass)

    expect(target.stringProp).toBe('existing value')
    expect(target.numberProp).toBe(100)
    expect(target.booleanProp).toBe(true)
  })

  it('should respect isPropertyInherited predicate', () => {
    const target: Record<string, any> = {}
    const isPropertyInherited = (key: string) => key !== 'numberProp'

    inheritPropertyInitializers(target, SourceClass, isPropertyInherited)

    expect(target.stringProp).toBe('default string')
    expect(target.numberProp).toBeUndefined()
    expect(target.booleanProp).toBe(true)
  })

  it('should handle errors gracefully', () => {
    // Create a class that throws an error when instantiated
    class ErrorClass {
      constructor() {
        throw new Error('Instantiation error')
      }

      prop = 'value'
    }

    const target: Record<string, any> = {}

    // This should not throw an error
    expect(() => {
      inheritPropertyInitializers(target, ErrorClass as any)
    }).not.toThrow()

    // The target should remain empty
    expect(Object.keys(target).length).toBe(0)
  })
})
