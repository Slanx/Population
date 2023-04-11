import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { IsGroups } from 'src/common/decorators/IsGroup';
import { Group, GroupType } from '../schemas/group.schema';

export class UpdateResidentDto {
  @IsArray()
  @ArrayMinSize(Object.keys(GroupType).length)
  @ArrayMaxSize(Object.keys(GroupType).length)
  @IsGroups({ message: 'Invalid groups' })
  @Type(() => Group)
  groups: Group[];
}
