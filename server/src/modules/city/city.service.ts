import { readFile } from 'fs/promises';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schema/city.schema';

@Injectable()
export class CityService implements OnModuleInit {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async onModuleInit() {
    const isFilled = await this.cityModel.find();
    if (isFilled.length === 0) {
      const file = await readFile('src/initialData/cities.json', 'utf-8');
      const cities = JSON.parse(file);

      await this.cityModel.create(cities);
    }
  }

  async create(createCityDto: CreateCityDto) {
    const isCity = await this.cityModel.findOne({
      name: { $regex: createCityDto.name, $options: 'i' },
    });

    if (isCity)
      throw new BadRequestException(
        'This city is already in the reference book',
      );

    const city = new this.cityModel(createCityDto);

    return city.save();
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.cityModel
      .find()
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const city = await this.cityModel.findById(id).exec();

    if (!city) {
      throw new NotFoundException('This city is not in the reference book');
    }

    return city;
  }

  async findByTitle(title: string) {
    const city = await this.cityModel.findOne({ name: title }).exec();

    if (!city) {
      throw new NotFoundException('This city is not in the reference book');
    }

    return city;
  }

  async search(paginationQuery: PaginationQueryDto, title: string) {
    const { limit, offset } = paginationQuery;

    const city = await this.cityModel
      .find({ name: new RegExp(title, 'i') })
      .skip(offset)
      .limit(limit)
      .sort({ name: 1, data: -1 })
      .exec();

    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.cityModel.findByIdAndUpdate(
      id,
      { $set: updateCityDto },
      { new: true },
    );

    if (!city) {
      throw new NotFoundException('This city is not in the reference book');
    }

    return city;
  }

  async remove(id: string) {
    const city = this.cityModel.findByIdAndDelete(id).exec();

    if (!city) {
      throw new NotFoundException('This city is not in the reference book');
    }

    return city;
  }
}
