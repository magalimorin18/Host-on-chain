import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserInput {
  @IsNotEmpty()
  @IsOptional()
  public donation?: number;
}
