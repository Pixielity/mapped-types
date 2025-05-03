import "reflect-metadata"
import { IsString, IsEmail, validate } from "class-validator"
import { PartialType } from "../helpers/partial-type.helper"

describe("PartialType", () => {
  class UserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    constructor() {
      this.name = "Default Name"
      this.email = "default@example.com"
    }
  }

  class UpdateUserDto extends PartialType(UserDto) {}

  it("should create a class with the same properties", () => {
    const updateUserDto = new UpdateUserDto()

    expect(updateUserDto).toHaveProperty("name")
    expect(updateUserDto).toHaveProperty("email")
  })

  it("should inherit property initializers", () => {
    const updateUserDto = new UpdateUserDto()

    expect(updateUserDto.name).toBe("Default Name")
    expect(updateUserDto.email).toBe("default@example.com")
  })

  it("should allow undefined values for properties", async () => {
    const updateUserDto = new UpdateUserDto()
    updateUserDto.name = undefined
    updateUserDto.email = undefined

    const errors = await validate(updateUserDto)

    expect(errors.length).toBe(0)
  })

  it("should validate defined properties", async () => {
    const updateUserDto = new UpdateUserDto()
    updateUserDto.name = 123 as any // Invalid name
    updateUserDto.email = "invalid-email" // Invalid email

    const errors = await validate(updateUserDto)

    expect(errors.length).toBe(2)
    expect(errors[0].property).toBe("name")
    expect(errors[1].property).toBe("email")
  })

  it("should validate with skipNullProperties=false", async () => {
    class StrictUpdateUserDto extends PartialType(UserDto, { skipNullProperties: false }) {}

    const updateUserDto = new StrictUpdateUserDto()
    updateUserDto.name = undefined
    updateUserDto.email = null as any

    const errors = await validate(updateUserDto)

    // With skipNullProperties=false, undefined values are still allowed,
    // but null values are validated
    expect(errors.length).toBe(1)
    expect(errors[0].property).toBe("email")
  })
})
