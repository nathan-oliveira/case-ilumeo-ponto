import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { PointsService } from './points.service';
import { RegisterPointDto } from './dtos/register-point.dto';
import { ReadPointDto } from './dtos/read-point.dto';

import { QueryParamsDto } from './dtos/query-params.dto';
import { ReadWorkedDto } from './dtos/read-worked.dto';
import { ReadPointHoursWorkedDto } from './dtos/read-point-hours-worked.dto';

@ApiTags('Points')
@Controller('points')
@UseInterceptors(ClassSerializerInterceptor)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  @ApiOkResponse({ type: ReadPointDto })
  async registerPoint(
    @Body() registerPointDto: RegisterPointDto,
  ): Promise<ReadPointDto> {
    const record = await this.pointsService.registerPoint(registerPointDto);
    return plainToClass(RegisterPointDto, record);
  }

  @Get('hours-worked-today')
  async findHoursWorkedToday(
    @Query() { userCode }: QueryParamsDto,
  ): Promise<ReadWorkedDto> {
    const record = await this.pointsService.findHoursWorkedToday(userCode);
    return plainToClass(ReadWorkedDto, record);
  }

  @Get()
  @ApiOkResponse({ type: [ReadPointDto] })
  async findAll(
    @Query() queryParams: QueryParamsDto,
  ): Promise<ReadPointHoursWorkedDto[]> {
    const records = await this.pointsService.findAllByUserCode(queryParams);
    return plainToClass(ReadPointHoursWorkedDto, records);
  }
}
