import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { PointEntity } from './entities/points.entity';
import { RecordTypeEnum } from './enums/record-type.enum';

import { ReadPointDto } from './dtos/read-point.dto';
import { ReadPointHoursWorkedDto } from './dtos/read-point-hours-worked.dto';
import { ReadInfoLastRecordDto } from './dtos/read-info-last-record.dto';

import { RegisterPointDto } from './dtos/register-point.dto';

import { QueryParamsDto } from './dtos/query-params.dto';
import { ReadWorkedDto } from './dtos/read-worked.dto';

import { createMatrixAndCalculateWorkingHours } from 'src/common/utils/create-matrix-records';
import { createGroupMatrixAndCalculateRecords } from 'src/common/utils/create-group-matrix-records';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointEntity)
    private readonly pointRepository: Repository<PointEntity>,
  ) {}

  async getInfoLastRecord(userCode: string): Promise<ReadInfoLastRecordDto> {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0);
    endDate.setHours(23, 59, 59);

    const record = await this.pointRepository.findOne({
      where: {
        registrationDate: Between(startDate, endDate),
        userCode,
      },
      order: { orderOfRegistration: 'DESC' },
    });

    if (!record)
      return { recordType: RecordTypeEnum.PROHIBITED, orderOfRegistration: 0 };

    const { recordType, orderOfRegistration } = record;

    return {
      orderOfRegistration,
      recordType:
        recordType === RecordTypeEnum.PROHIBITED
          ? RecordTypeEnum.EXIT
          : RecordTypeEnum.PROHIBITED,
    };
  }

  async registerPoint({ userCode }: RegisterPointDto): Promise<ReadPointDto> {
    const lastRecord = await this.getInfoLastRecord(userCode);

    const preloadPoint = this.pointRepository.create({
      userCode,
      registrationDate: new Date(),
      recordType: lastRecord.recordType,
      orderOfRegistration: lastRecord.orderOfRegistration + 1,
    });

    return this.pointRepository.save(preloadPoint);
  }

  async findHoursWorkedToday(userCode: string): Promise<ReadWorkedDto> {
    const startDate = new Date().setHours(0, 0, 0);
    const endDate = new Date().setHours(23, 59, 59);

    const records = await this.pointRepository.find({
      where: {
        userCode,
        registrationDate: Between(new Date(startDate), new Date(endDate)),
      },
      order: { orderOfRegistration: 'ASC' },
    });

    return createMatrixAndCalculateWorkingHours(records);
  }

  async findAllByUserCode(
    QueryParamsDto: QueryParamsDto,
  ): Promise<ReadPointHoursWorkedDto[]> {
    const { userCode } = QueryParamsDto;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const records = await this.pointRepository.find({
      where: {
        registrationDate: Between(new Date(0), today),
        userCode,
      },
      order: { registrationDate: 'ASC', orderOfRegistration: 'ASC' },
    });

    const groupRecords = await createGroupMatrixAndCalculateRecords(records);
    return [...groupRecords].reverse();
  }
}
