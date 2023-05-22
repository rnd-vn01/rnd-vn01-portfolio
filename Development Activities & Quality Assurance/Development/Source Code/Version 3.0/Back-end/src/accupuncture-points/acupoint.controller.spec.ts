import { Test } from '@nestjs/testing';
import { AcupointController } from './acupoint.controller';
import { AcupointService_vi } from './services/acupoint-vi.service';
import { LanguageEnum } from '../shared/enums/language.enum';
import {
  AcupointsEntity_vi,
  AcupointsSchema_vi,
} from './entities/acupoint-vi.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, Model, connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AcupointService_en } from './services/acupoint-en.service';
import { AcupointsEntity_en } from './entities/acupoint-en.entity';

const ACUPOINT = {
  code: 'Code',
  name: 'Name',
  description: 'Des',
  anatomy: 'Anatomy',
  technique: 'Technique',
  functionalities: ['Func 1', 'Func 2'],
  caution: 'Caution',
} as AcupointsEntity_en;

const ACUPOINTS = [ACUPOINT] as AcupointsEntity_en[];

describe('AcupointController', () => {
  let acupointController: AcupointController;
  let acupointServiceVi: AcupointService_vi;
  let acupointServiceEn: AcupointService_en;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let acupointViModel: Model<AcupointsEntity_vi>;
  let acupointEnModel: Model<AcupointsEntity_en>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    acupointViModel = mongoConnection.model(
      AcupointsEntity_vi.name,
      AcupointsSchema_vi,
    );
    acupointEnModel = mongoConnection.model(
      AcupointsEntity_en.name,
      AcupointsSchema_vi,
    );

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AcupointController],
      providers: [
        AcupointService_vi,
        AcupointService_en,
        JwtService,
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(AcupointsEntity_vi.name),
          useValue: acupointViModel,
        },
        {
          provide: getModelToken(AcupointsEntity_en.name),
          useValue: acupointEnModel,
        },
      ],
    }).compile();

    acupointController = moduleRef.get<AcupointController>(AcupointController);
    acupointServiceVi = moduleRef.get<AcupointService_vi>(AcupointService_vi);
    acupointServiceEn = moduleRef.get<AcupointService_en>(AcupointService_en);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('findAll - en', () => {
    it('should return an array of object in Eng', async () => {
      // Filter the result based on condition
      const filteredResults = ACUPOINTS.filter(() => true);

      jest
        .spyOn(acupointServiceEn, 'findAll')
        .mockResolvedValue(filteredResults);

      expect(
        await acupointController.getAll({
          language: LanguageEnum.EN,
        }),
      ).toBe(filteredResults);
    });
  });

  describe('findAll - vi', () => {
    it('should return an array of object in Vi', async () => {
      // Filter the result based on condition
      const filteredResults = ACUPOINTS.filter(() => true);

      jest
        .spyOn(acupointServiceVi, 'findAll')
        .mockResolvedValue(filteredResults);

      expect(
        await acupointController.getAll({
          language: LanguageEnum.VI,
        }),
      ).toBe(filteredResults);
    });
  });

  describe('getOneByFilter - vi', () => {
    it('should return an object in Vi by code', async () => {
      // Filter the result based on condition
      const filteredResult = ACUPOINT;

      jest
        .spyOn(acupointServiceVi, 'findOne')
        .mockResolvedValue(filteredResult);

      expect(
        await acupointController.getOneByFilter({
          language: LanguageEnum.VI,
          code: 'Code',
        }),
      ).toBe(filteredResult);
    });
  });

  describe('getOneByFilter - en', () => {
    it('should return an object in Eng by code', async () => {
      // Filter the result based on condition
      const filteredResult = ACUPOINT;

      jest
        .spyOn(acupointServiceEn, 'findOne')
        .mockResolvedValue(filteredResult);

      expect(
        await acupointController.getOneByFilter({
          language: LanguageEnum.EN,
          code: 'Code',
        }),
      ).toBe(filteredResult);
    });
  });

  describe('updateAcupoint - en', () => {
    it("should return the created object and saved", async () => {
      const createdAcupoint = await acupointController.updateAcupoint({
        language: LanguageEnum.EN
      }, { ...ACUPOINT });

      expect(createdAcupoint).toBeTruthy()
    })
  })

  describe('updateAcupoint - vi', () => {
    it("should return the created object and saved", async () => {
      const createdAcupoint = await acupointController.updateAcupoint({
        language: LanguageEnum.VI
      }, { ...ACUPOINT });

      expect(createdAcupoint).toBeTruthy()
    })
  })
});
