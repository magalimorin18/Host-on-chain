import { IsNotEmpty } from "class-validator";

export class CreateUserInput {
  @IsNotEmpty()
  public id!: string;

  @IsNotEmpty()
  public address!: string;

  @IsNotEmpty()
  public donation!: Int8Array;
}
