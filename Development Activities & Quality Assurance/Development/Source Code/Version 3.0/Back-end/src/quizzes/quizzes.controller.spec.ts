import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import {
  IQuestionDetail,
  QuizzesEntity,
  QuizzesSchema,
} from './entities/quizzes.entity';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuestionDetailDto } from './dto/create-quiz.request.dto';

const QUIZZ_DETAIL: IQuestionDetail = {
  question: 'question',
  answer: 1,
  correctAnswer: 1,
  time: 10,
  isCorrect: true,
  options: [
    { id: 1, answer: 'answer_1' },
    { id: 2, answer: 'answer_2' },
  ],
};

const QUIZZ = {
  userFirebaseId: 'firebase_id',
  numberOfQuestions: 10,
  correctAnswers: 10,
  quizOption: 1,
  details: [QUIZZ_DETAIL],
  datetime: '2023-04-07T16:45:28.585Z',
} as QuizzesEntity;

const QUIZZES = [QUIZZ] as QuizzesEntity[];

describe('quizzesController', () => {
  let quizzesController: QuizzesController;
  let quizzesService: QuizzesService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let quizzesModel: Model<QuizzesEntity>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    quizzesModel = mongoConnection.model(QuizzesEntity.name, QuizzesSchema);

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [QuizzesController],
      providers: [
        QuizzesService,
        JwtService,
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(QuizzesEntity.name),
          useValue: quizzesModel,
        },
      ],
    }).compile();

    quizzesController = moduleRef.get<QuizzesController>(QuizzesController);
    quizzesService = moduleRef.get<QuizzesService>(QuizzesService);
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

  describe('getAllByUser', () => {
    it('should return an array of object in by firebase', async () => {
      // Filter the result based on condition
      const filteredResult = QUIZZES;

      jest.spyOn(quizzesService, 'find').mockResolvedValue(filteredResult);

      expect(
        await quizzesController.findAllByUserFirebaseId('firebase_id'),
      ).toBe(filteredResult);
    });
  });

  describe('findOne', () => {
    it('should return an object by Id', async () => {
      jest.spyOn(quizzesService, 'findOne').mockResolvedValue(QUIZZ);

      expect(await quizzesController.findOne('_id')).toBe(
        QUIZZ,
      );
    });
  });

  describe('create', () => {
    it('should return the created object result', async () => {
      const createdQuizResult = await quizzesController.create({
        userFirebaseId: QUIZZ.userFirebaseId,
        numberOfQuestions: QUIZZ.numberOfQuestions,
        correctAnswers: QUIZZ.correctAnswers,
        quizOption: QUIZZ.quizOption,
        details: [QUIZZ_DETAIL as QuestionDetailDto],
        datetime: QUIZZ.datetime
      });

      expect(createdQuizResult).toBeTruthy()
    })
  })
});
