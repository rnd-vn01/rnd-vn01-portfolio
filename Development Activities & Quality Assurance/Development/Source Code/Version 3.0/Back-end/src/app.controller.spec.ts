import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import * as mocks from "node-mocks-http";

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
            generateJWT: jest.fn(x => "JWT TOKEN")
          },
        },],
    }).compile();
    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe("authService", () => {
    it("should return the JWT token", async () => {
      const req = mocks.createRequest({
        method: 'POST',
        url: '/login',
        body: {
          firebase_id: "FIREBASE_ID"
        }
      })

      const createdUserToken = await appController.login(req);

      expect(createdUserToken).toBe("JWT TOKEN")
    })
  })
});
