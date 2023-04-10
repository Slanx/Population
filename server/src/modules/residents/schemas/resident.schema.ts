import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseScheema } from 'mongoose';
import { City } from 'src/modules/city/schema/city.schema';
import { Group } from './group.schema';

export type ResidentDocument = HydratedDocument<Resident>;

export const GroupSchema = SchemaFactory.createForClass(Group);

@Schema()
export class Resident {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: MongooseScheema.Types.ObjectId,
    ref: City.name,
  })
  city: City;

  @Prop({
    type: [{ type: GroupSchema }],
    required: true,
    default: [],
  })
  groups: Group[];
}

export const ResidentSchema = SchemaFactory.createForClass(Resident);
