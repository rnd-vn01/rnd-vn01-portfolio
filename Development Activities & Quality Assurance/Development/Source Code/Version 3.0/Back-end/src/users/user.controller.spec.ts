import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserRoleEnum } from './enums/user-role.enum';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const USER = {
  firebase_id: 'firebase_id',
  email: 'example@gmail.com',
  image: 'image_link',
  name: 'name',
  roles: [UserRoleEnum.ADMIN, UserRoleEnum.USER],
} as UserEntity;

const USERS = [USER] as UserEntity[];

describe('userController', () => {
  let userController: UserController;
  let userService: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserEntity>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(UserEntity.name, UserSchema);

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        UserService,
        JwtService,
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(UserEntity.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
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

  describe('getAll', () => {
    it('should return an array of object', async () => {
      // Filter the result based on condition
      const filteredResult = USERS.filter(() => true);

      jest.spyOn(userService, 'findAll').mockResolvedValue(filteredResult);

      expect(await userController.findAll()).toBe(filteredResult);
    });
  });

  describe('getAll', () => {
    it('should return an array of object', async () => {
      // Filter the result based on condition
      const filteredResult = USERS.filter(() => true);

      jest.spyOn(userService, 'findAll').mockResolvedValue(filteredResult);

      expect(await userController.findAll()).toBe(filteredResult);
    });
  });

  describe('findByFirebaseID', () => {
    it('should return an object by Id', async () => {
      // Filter the result based on condition
      const filteredResults = USER;

      jest.spyOn(userService, 'findOne').mockResolvedValue(filteredResults);

      expect(await userController.findOne('firebase_id')).toBe(filteredResults);
    });
  });

  describe('findByFirebaseID', () => {
    it('should return an object by Id', async () => {
      // Filter the result based on condition
      const filteredResults = USER;

      jest.spyOn(userService, 'findOne').mockResolvedValue(filteredResults);

      expect(await userController.findOne('firebase_id')).toBe(filteredResults);
    });
  });

  describe('findByEmail', () => {
    it('should return an object by Id', async () => {
      // Filter the result based on condition
      const filteredResults = USER;

      jest.spyOn(userService, 'findOne').mockResolvedValue(filteredResults);

      expect(await userController.findOneByEmail('example@gmail.com')).toBe(
        filteredResults,
      );
    });
  });

  describe("create", () => {
    it('should return the created result as success if not duplicated', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      expect(await userController.create({ ...USER })).toEqual(expect.objectContaining({ ...USER }))
    });

    it("should throws error if user is duplicated", async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue({ ...USER } as UserEntity);

      expect(userController.create({ ...USER })).rejects.toThrow()
    })
  })

  describe("updateProfile", () => {
    it('should return the update result as success', async () => {
      const user = { ...USER }
      user.name = "Updated Name"
      jest.spyOn(userService, 'findOneAndUpdate').mockResolvedValue({ ...user } as UserEntity);

      const updateResult = await userController.update({ ...user });

      expect(updateResult.name).toBe("Updated Name")
    });
  })
});
