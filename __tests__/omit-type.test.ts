import 'reflect-metadata'
import { IsString, IsEmail, validate } from 'class-validator'
import { OmitType } from '../src/helpers/omit-type.helper'

describe('OmitType', () => {
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

  class UserResponseDto extends OmitType(UserDto, ['password']) {}

  it('should create a class without omitted properties', () => {
    const userResponseDto = new UserResponseDto()

    expect(userResponseDto).toHaveProperty('name')
    expect(userResponseDto).toHaveProperty('email')
    expect(userResponseDto).not.toHaveProperty('password')
  })

  it('should inherit property initializers for non-omitted properties', () => {
    const userResponseDto = new UserResponseDto()

    expect(userResponseDto.name).toBe('Default Name')
    expect(userResponseDto.email).toBe('default@example.com')
  })

  it('should inherit validation metadata for non-omitted properties', async () => {
    const userResponseDto = new UserResponseDto()
    userResponseDto.name = 123 as any // Invalid name
    userResponseDto.email = 'invalid-email' // Invalid email

    const errors = await validate(userResponseDto)

    expect(errors.length).toBe(2)
    expect(errors[0].property).toBe('name')
    expect(errors[1].property).toBe('email')
  })
})
