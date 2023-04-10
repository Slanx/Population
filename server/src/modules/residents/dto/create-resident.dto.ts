import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Group, GroupType } from '../schemas/group.schema';

export class CreateResidentDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsArray()
  @ValidateIf(
    ({ groups }) => {
      for (const groupType of Object.keys(GroupType)) {
        const result = groups.some((group) => group.type === groupType);
        if (!result) return false;
      }
      return true;
    },
    { message: 'Invalid groups' },
  )
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(GroupType).length)
  @ArrayMaxSize(Object.keys(GroupType).length)
  @Type(() => Group)
  groups: Group[];
}
