import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsGroups } from 'src/common/decorators/IsGroup';
import { Group, GroupType } from '../schemas/group.schema';

export class CreateResidentDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsArray()
  @ArrayMinSize(Object.keys(GroupType).length)
  @ArrayMaxSize(Object.keys(GroupType).length)
  @IsGroups({ message: 'Invalid groups' })
  @Type(() => Group)
  groups: Group[];
}
