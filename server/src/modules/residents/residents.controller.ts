import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/ParseObjectIdPipe.pipe';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Post()
  async create(@Body() createResidentDto: CreateResidentDto) {
    return this.residentsService.create(createResidentDto);
  }

  @Get()
  async findAll() {
    return this.residentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.residentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    return this.residentsService.update(id, updateResidentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.residentsService.remove(id);
  }
}
