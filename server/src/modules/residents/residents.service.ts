import { readFile } from 'fs/promises';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { Resident, ResidentDocument } from './schemas/resident.schema';
import { CityService } from '../city/city.service';
import { Group, GroupType } from './schemas/group.schema';

@Injectable()
export class ResidentsService implements OnModuleInit {
  constructor(
    @InjectModel(Resident.name) private residentModel: Model<ResidentDocument>,
    private readonly cityService: CityService,
  ) {}

  async onModuleInit() {
    const isFilled = await this.residentModel.find();
    if (isFilled.length === 0) {
      const file = await readFile('src/initialData/residents.json', 'utf-8');
      const residents = JSON.parse(file) as Omit<Resident, 'city'>[];
      const residentsWithCity = await Promise.all(
        residents.map(async (resident) => {
          const city = await this.getCity(resident.groups);
          return { ...resident, city: city.id };
        }),
      );
      await this.residentModel.create(residentsWithCity);
    }
  }

  async create(createResidentDto: CreateResidentDto) {
    const city = await this.getCity(createResidentDto.groups);

    const resident = new this.residentModel({
      ...createResidentDto,
      city: city.id,
    });

    return resident.save();
  }

  async findAll() {
    return this.residentModel.find().populate('city').exec();
  }

  async findOne(id: string) {
    const resident = await this.residentModel.findById(id);

    if (!resident) {
      throw new NotFoundException('This resident does not exist');
    }

    return resident;
  }

  async remove(id: string) {
    const resident = this.residentModel.findByIdAndDelete(id).exec();

    if (!resident) {
      throw new NotFoundException('This resident does not exist');
    }

    return resident;
  }
  async update(id: string, updateResidentDto: UpdateResidentDto) {
    const city = await this.getCity(updateResidentDto.groups);

    const resident = await this.residentModel
      .findByIdAndUpdate(
        id,
        { $set: { ...updateResidentDto, city: city.id } },
        { new: true },
      )
      .exec();

    if (!resident) {
      throw new NotFoundException('This resident does not exist');
    }

    return resident;
  }

  private async getCity(groups: Group[]) {
    const cityGroup = groups.find(({ type }) => type === GroupType.CITY);

    let cityName = cityGroup.name;
    const splitCityName = cityGroup.name.split(' ');

    if (splitCityName.length > 1) {
      cityName = splitCityName.slice(0, -1).join(' ');
    }

    const city = await this.cityService.findByTitle(cityName);

    return city;
  }
}
