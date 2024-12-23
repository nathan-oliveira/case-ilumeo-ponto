import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PointsController } from './points.controller';
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
  mockQueryParamsDto,
} from '../../../test/mocks/points';

describe('PointsController', () => {
  let controller: PointsController;
  let service: PointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PointEntity],
      controllers: [PointsController],
      providers: [
        PointsService,
        {
          provide: getRepositoryToken(PointEntity),
          useValue: mockMethodsRepository,
        },
      ],
    }).compile();

    controller = module.get<PointsController>(PointsController);
    service = module.get<PointsService>(PointsService);
  });

  it('controller must be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('registerPoint', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPointDto();

      const findSpy = jest
        .spyOn(controller, 'registerPoint')
        .mockResolvedValueOnce(result);

      const body = mockRegisterPointDto();

      await controller.registerPoint(body);

      expect(findSpy).toHaveBeenCalledWith(body);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPointDto();

      const findSpy = jest
        .spyOn(controller, 'registerPoint')
        .mockResolvedValueOnce(result);

      await controller.registerPoint(null);

      const body = mockRegisterPointDto();

      expect(findSpy).not.toHaveBeenCalledWith(body);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPointDto();

      jest.spyOn(controller, 'registerPoint').mockResolvedValueOnce(result);

      const body = mockRegisterPointDto();

      expect(await controller.registerPoint(body)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(controller, 'registerPoint')
        .mockRejectedValueOnce(new Error());

      const body = mockRegisterPointDto();

      expect(controller.registerPoint(body)).rejects.toThrow(new Error());
    });
  });

  describe('findHoursWorkedToday', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadWorkedDto();

      const findSpy = jest
        .spyOn(controller, 'findHoursWorkedToday')
        .mockResolvedValueOnce(result);

      const query = mockQueryParamsDto();

      await controller.findHoursWorkedToday(query);

      expect(findSpy).toHaveBeenCalledWith(query);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadWorkedDto();

      const findSpy = jest
        .spyOn(service, 'findHoursWorkedToday')
        .mockResolvedValueOnce(result);

      const query = mockQueryParamsDto();

      await controller.findHoursWorkedToday({ userCode: null });

      expect(findSpy).not.toHaveBeenCalledWith(query);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadWorkedDto();

      jest
        .spyOn(controller, 'findHoursWorkedToday')
        .mockResolvedValueOnce(result);

      const query = mockQueryParamsDto();

      expect(await controller.findHoursWorkedToday(query)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(service, 'findHoursWorkedToday')
        .mockRejectedValueOnce(new Error());

      const query = mockQueryParamsDto();

      expect(controller.findHoursWorkedToday(query)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('findAll', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPointHoursWorkedDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([result]);

      const queryParams = mockQueryParamsDto();

      await controller.findAll(queryParams);

      expect(findSpy).toHaveBeenCalledWith(queryParams);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPointHoursWorkedDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([result]);

      await controller.findAll(null);

      const queryParams = mockQueryParamsDto();

      expect(findSpy).not.toHaveBeenCalledWith(queryParams);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPointHoursWorkedDto();

      jest.spyOn(controller, 'findAll').mockResolvedValueOnce([result]);

      const queryParams = mockQueryParamsDto();

      expect(await controller.findAll(queryParams)).toEqual([result]);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'findAll').mockRejectedValueOnce(new Error());

      const queryParams = mockQueryParamsDto();

      expect(controller.findAll(queryParams)).rejects.toThrow(new Error());
    });
  });
});
