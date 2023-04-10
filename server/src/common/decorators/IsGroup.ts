import { registerDecorator, ValidationOptions } from 'class-validator';
import { Group, GroupType } from 'src/modules/residents/schemas/group.schema';

export function IsGroups(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsGroups',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(groups: Group[]) {
          for (const groupType of Object.values(GroupType)) {
            const result = groups.some((group) => group.type === groupType);
            if (!result) return false;
          }
          return true;
        },
      },
    });
  };
}
