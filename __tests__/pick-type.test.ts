import 'reflect-metadata'
import { IsString, IsEmail, validate } from 'class-validator'
import { PickType } from '../src/helpers/pick-type.helper'

describe('PickType', () => {
  class UserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    constructor() {
      this.name = 'Default Name'
      this.email = 'default@example.com'
      this.password = 'password123'
    }
  }

  class CreateUserDto extends PickType(UserDto, ['name', 'email', 'password']) {}

  it('should create a class with picked properties', () => {
    const createUserDto = new CreateUserDto()

    expect(createUserDto).toHaveProperty('name')
    expect(createUserDto).toHaveProperty('email')
    expect(createUserDto).toHaveProperty('password')
  })

  it('should inherit property initializers', () => {
    const createUserDto = new CreateUserDto()

    expect(createUserDto.name).toBe('Default Name')
    expect(createUserDto.email).toBe('default@example.com')
    expect(createUserDto.password).toBe('password123')
  })

  it('should inherit validation metadata', async () => {
    const createUserDto = new CreateUserDto()
    createUserDto.name = 123 as any // Invalid name
    createUserDto.email = 'invalid-email' // Invalid email

    const errors = await validate(createUserDto)

    expect(errors.length).toBe(2)
    expect(errors[0].property).toBe('name')
    expect(errors[1].property).toBe('email')
  })
})
