import { faker } from '@faker-js/faker';

import { QueryParamsDto } from '../../src/modules/points/dtos/query-params.dto';
import { ReadPointHoursWorkedDto } from '../../src/modules/points/dtos/read-point-hours-worked.dto';
import { ReadPointDto } from '../../src/modules/points/dtos/read-point.dto';
import { RecordTypeEnum } from '../../src/modules/points/enums/record-type.enum';
import { ReadWorkedDto } from '../../src/modules/points/dtos/read-worked.dto';
import { RegisterPointDto } from '../../src/modules/points/dtos/register-point.dto';
import { ReadInfoLastRecordDto } from '../../src/modules/points/dtos/read-info-last-record.dto';

export const mockUserCode: string = '4SXXFMF';

export const mockQueryParamsDto = (): QueryParamsDto => ({
  userCode: mockUserCode,
});

export const mockReadPointHoursWorkedDto = (): ReadPointHoursWorkedDto => ({
  registrationDate: '23/12/2024',
  hoursWorked: {
    hours: 0,
    minutes: 1,
    seconds: 11,
  },
});

export const mockReadPointDto = (): ReadPointDto => ({
  id: faker.string.uuid(),
  userCode: mockUserCode,
  registrationDate: new Date(),
  recordType: RecordTypeEnum.PROHIBITED,
  orderOfRegistration: 1,
});

export const mockReadWorkedDto = (): ReadWorkedDto => ({
  hours: 0,
  minutes: 1,
  seconds: 11,
  lastRecordType: RecordTypeEnum.PROHIBITED,
});

export const mockRegisterPointDto = (): RegisterPointDto => ({
  userCode: mockUserCode,
});

export const mockReadInfoLastRecordDto = (): ReadInfoLastRecordDto => ({
  recordType: RecordTypeEnum.PROHIBITED,
  orderOfRegistration: 0,
});

export const mockMethodsRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  insert: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
};
