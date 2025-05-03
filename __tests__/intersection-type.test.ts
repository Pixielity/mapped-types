import 'reflect-metadata'
import { IsString, IsNumber, validate } from 'class-validator'
import { IntersectionType } from '../src/helpers/intersection-type.helper'

describe('IntersectionType', () => {
  class UserDto {
    @IsString()
    name: string

    constructor() {
      this.name = 'Default Name'
    }
  }

  class AddressDto {
    @IsString()
    street: string

    @IsNumber()
    zipCode: number

    constructor() {
      this.street = 'Default Street'
      this.zipCode = 12345
    }
  }

  class UserWithAddressDto extends IntersectionType(UserDto, AddressDto) {}

  it('should create a class with properties from all source classes', () => {
    const userWithAddressDto = new UserWithAddressDto()

    expect(userWithAddressDto).toHaveProperty('name')
    expect(userWithAddressDto).toHaveProperty('street')
    expect(userWithAddressDto).toHaveProperty('zipCode')
  })

  it('should inherit property initializers from all source classes', () => {
    const userWithAddressDto = new UserWithAddressDto()

    expect(userWithAddressDto.name).toBe('Default Name')
    expect(userWithAddressDto.street).toBe('Default Street')
    expect(userWithAddressDto.zipCode).toBe(12345)
  })

  it('should inherit validation metadata from all source classes', async () => {
    const userWithAddressDto = new UserWithAddressDto()
    userWithAddressDto.name = 123 as any // Invalid name
    userWithAddressDto.street = 456 as any // Invalid street
    userWithAddressDto.zipCode = 'invalid' as any // Invalid zipCode

    const errors = await validate(userWithAddressDto)

    expect(errors.length).toBe(3)
    expect(errors.map((e) => e.property).sort()).toEqual(['name', 'street', 'zipCode'].sort())
  })
})
