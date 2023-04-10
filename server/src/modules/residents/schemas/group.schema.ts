import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

export enum GroupType {
  CITY = 'city',
  DISTRICT = 'district',
  STREET = 'street',
}

@Schema()
export class Group {
  @Prop({ type: String, enum: GroupType })
  type: GroupType;
  @Prop({ index: true })
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.index({ name: 1 });
