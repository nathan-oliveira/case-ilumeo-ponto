import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PointsService } from './points.service';
import { PointEntity } from './entities/points.entity';

import {
  mockMethodsRepository,
  mockUserCode,
  mockReadInfoLastRecordDto,
  mockReadPointHoursWorkedDto,
  mockReadPointDto,
  mockReadWorkedDto,
  mockRegisterPointDto,
} from '../../../test/mocks/points';

describe('PointsService', () => {
  let service: PointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PointEntity],
      providers: [
        PointsService,
        {
          provide: getRepositoryToken(PointEntity),
          useValue: mockMethodsRepository,
        },
      ],
    }).compile();

    service = module.get<PointsService>(PointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getInfoLastRecord', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadInfoLastRecordDto();

      const findSpy = jest
        .spyOn(service, 'getInfoLastRecord')
        .mockResolvedValueOnce(result);

      await service.getInfoLastRecord(mockUserCode);

      expect(findSpy).toHaveBeenCalledWith(mockUserCode);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadInfoLastRecordDto();

      const findSpy = jest
        .spyOn(service, 'getInfoLastRecord')
        .mockResolvedValueOnce(result);

      await service.getInfoLastRecord(null);

      expect(findSpy).not.toHaveBeenCalledWith(mockUserCode);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadInfoLastRecordDto();

      jest.spyOn(service, 'getInfoLastRecord').mockResolvedValueOnce(result);

      expect(await service.getInfoLastRecord(mockUserCode)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(service, 'getInfoLastRecord')
        .mockRejectedValueOnce(new Error());

      expect(service.getInfoLastRecord(mockUserCode)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('registerPoint', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPointDto();

      const findSpy = jest
        .spyOn(service, 'registerPoint')
        .mockResolvedValueOnce(result);

      const body = mockRegisterPointDto();

      await service.registerPoint(body);

      expect(findSpy).toHaveBeenCalledWith(body);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPointDto();

      const findSpy = jest
        .spyOn(service, 'registerPoint')
        .mockResolvedValueOnce(result);

      await service.registerPoint(null);

      const body = mockRegisterPointDto();

      expect(findSpy).not.toHaveBeenCalledWith(body);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPointDto();

      jest.spyOn(service, 'registerPoint').mockResolvedValueOnce(result);

      const body = mockRegisterPointDto();

      expect(await service.registerPoint(body)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'registerPoint').mockRejectedValueOnce(new Error());

      const body = mockRegisterPointDto();

      expect(service.registerPoint(body)).rejects.toThrow(new Error());
    });
  });

  describe('findHoursWorkedToday', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadWorkedDto();

      const findSpy = jest
        .spyOn(service, 'findHoursWorkedToday')
        .mockResolvedValueOnce(result);

      await service.findHoursWorkedToday(mockUserCode);

      expect(findSpy).toHaveBeenCalledWith(mockUserCode);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadWorkedDto();

      const findSpy = jest
        .spyOn(service, 'findHoursWorkedToday')
        .mockResolvedValueOnce(result);

      await service.findHoursWorkedToday(null);

      expect(findSpy).not.toHaveBeenCalledWith(mockUserCode);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadWorkedDto();

      jest.spyOn(service, 'findHoursWorkedToday').mockResolvedValueOnce(result);

      expect(await service.findHoursWorkedToday(mockUserCode)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(service, 'findHoursWorkedToday')
        .mockRejectedValueOnce(new Error());

      expect(service.findHoursWorkedToday(mockUserCode)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('findAllByUserCode', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPointHoursWorkedDto();

      const findSpy = jest
        .spyOn(service, 'findAllByUserCode')
        .mockResolvedValueOnce([result]);

      const queryParams = mockRegisterPointDto();

      await service.findAllByUserCode(queryParams);

      expect(findSpy).toHaveBeenCalledWith(queryParams);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPointHoursWorkedDto();

      const findSpy = jest
        .spyOn(service, 'findAllByUserCode')
        .mockResolvedValueOnce([result]);

      await service.findAllByUserCode(null);

      const queryParams = mockRegisterPointDto();

      expect(findSpy).not.toHaveBeenCalledWith(queryParams);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPointHoursWorkedDto();

      jest.spyOn(service, 'findAllByUserCode').mockResolvedValueOnce([result]);

      const queryParams = mockRegisterPointDto();

      expect(await service.findAllByUserCode(queryParams)).toEqual([result]);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(service, 'findAllByUserCode')
        .mockRejectedValueOnce(new Error());

      const queryParams = mockRegisterPointDto();

      expect(service.findAllByUserCode(queryParams)).rejects.toThrow(
        new Error(),
      );
    });
  });
});
