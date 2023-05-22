import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { LanguageEnum } from '../shared/enums/language.enum';
import { MeridiansEntity_en } from './entities/meridians-en.entity';
import {
  MeridiansEntity_vi,
  MeridiansSchema_vi,
} from './entities/meridians-vi.entity';
import { MeridianController } from './meridian.controller';
import { MeridianService_en } from './services/meridians-en.service';
import { MeridianService_vi } from './services/meridians-vi.service';

const MERIDIAN = {
  code: 'CODE',
  name: 'name',
  description: 'description',
  diseases: 'diseases',
  points: ['point_1', 'point_2'],
} as MeridiansEntity_en;

const MERIDIANS = [MERIDIAN] as MeridiansEntity_en[];

describe('meridianController', () => {
  let meridianController: MeridianController;
  let meridianServiceVi: MeridianService_vi;
  let meridianServiceEn: MeridianService_en;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let meridianViModel: Model<MeridiansEntity_vi>;
  let meridianEnModel: Model<MeridiansEntity_en>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    meridianViModel = mongoConnection.model(
      MeridiansEntity_vi.name,
      MeridiansSchema_vi,
    );
    meridianEnModel = mongoConnection.model(
      MeridiansEntity_en.name,
      MeridiansSchema_vi,
    );

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [MeridianController],
      providers: [
        MeridianService_vi,
        MeridianService_en,
        JwtService,
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(MeridiansEntity_vi.name),
          useValue: meridianViModel,
        },
        {
          provide: getModelToken(MeridiansEntity_en.name),
          useValue: meridianEnModel,
        },
      ],
    }).compile();

    meridianController = moduleRef.get<MeridianController>(MeridianController);
    meridianServiceVi = moduleRef.get<MeridianService_vi>(MeridianService_vi);
    meridianServiceEn = moduleRef.get<MeridianService_en>(MeridianService_en);
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
      const filteredResults = MERIDIANS.filter(() => true);

      jest
        .spyOn(meridianServiceEn, 'findAll')
        .mockResolvedValue(filteredResults);

      expect(
        await meridianController.getAll({
          language: LanguageEnum.EN,
        }),
      ).toBe(filteredResults);
    });
  });

  describe('findAll - vi', () => {
    it('should return an array of object in Vi', async () => {
      // Filter the result based on condition
      const filteredResults = MERIDIANS.filter(() => true);

      jest
        .spyOn(meridianServiceVi, 'findAll')
        .mockResolvedValue(filteredResults);

      expect(
        await meridianController.getAll({
          language: LanguageEnum.VI,
        }),
      ).toBe(filteredResults);
    });
  });

  describe('getOneByFilter - vi', () => {
    it('should return an object in Vi by code', async () => {
      // Filter the result based on condition
      const filteredResult = MERIDIAN;

      jest
        .spyOn(meridianServiceVi, 'findOne')
        .mockResolvedValue(filteredResult);

      expect(
        await meridianController.getOneByFilter({
          language: LanguageEnum.VI,
          code: 'Code',
        }),
      ).toBe(filteredResult);
    });
  });

  describe('getOneByFilter - en', () => {
    it('should return an object in Eng by code', async () => {
      // Filter the result based on condition
      const filteredResult = MERIDIAN;

      jest
        .spyOn(meridianServiceEn, 'findOne')
        .mockResolvedValue(filteredResult);

      expect(
        await meridianController.getOneByFilter({
          language: LanguageEnum.EN,
          code: 'Code',
        }),
      ).toBe(filteredResult);
    });
  });

  describe('updateMeridian - en', () => {
    it("should return the created object and saved", async () => {
      const createdAcupoint = await meridianController.updateMeridian({
        language: LanguageEnum.EN
      }, { ...MERIDIAN });

      expect(createdAcupoint).toBeTruthy()
    })
  })

  describe('updateMeridian - vi', () => {
    it("should return the created object and saved", async () => {
      const createdAcupoint = await meridianController.updateMeridian({
        language: LanguageEnum.VI
      }, { ...MERIDIAN });

      expect(createdAcupoint).toBeTruthy()
    })
  })
});
