import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/common/pipes/ParseObjectIdPipe.pipe';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.cityService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.cityService.findOne(id);
  }

  @Get('title/:name')
  async findByTitle(@Param('name') name: string) {
    return this.cityService.findByTitle(name);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    updateCityDto: UpdateCityDto,
  ) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.cityService.remove(id);
  }
}
