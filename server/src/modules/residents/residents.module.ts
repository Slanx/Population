import { Module } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resident, ResidentSchema } from './schemas/resident.schema';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resident.name, schema: ResidentSchema },
    ]),
    CityModule,
  ],
  controllers: [ResidentsController],
  providers: [ResidentsService],
})
export class ResidentsModule {}
