import { IEmailValidator } from '@utils/validator/interfaces/interface-email-validator';
import { AlreadyExists } from '@errors/error-data';
import { TypeParamError } from '@errors/error-parameters';
import { DatabaseError, DATABASE_ERROR } from '@errors/errors-database';
import { CreateClientService } from '@useCases/client/create/create.service';
import { ICreateClientModel } from '@useCases/client/create/interfaces/create-client-model';
import { ICreateClientService } from '@useCases/client/create/interfaces/service-interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { IGetByDataBaseRepo } from 'src/infra/repository/base/getByData/interface-get-by-data-repository';

describe('Create Client Service', () => {
  let service: ICreateClientService;
  let findRepo: MockProxy<IGetByDataBaseRepo>;
  let validateEmail: MockProxy<IEmailValidator>;

  const mockCreate: ICreateClientModel = {
    name: 'mock',
    password: '1234',
    age: 28,
    email: 'mock@example.com',
    telephone: '123',
  };

  beforeAll(() => {
    findRepo = mock();
    validateEmail = mock();
    service = new CreateClientService(findRepo, validateEmail);

    findRepo.get.mockResolvedValue(undefined);
    validateEmail.validate.mockReturnValue(true);
  });

  it('should to throw if email type not valid', async () => {
    validateEmail.validate.mockReturnValueOnce(false);
    const promise = service.start({ ...mockCreate, email: 'email_notvalid' });
    expect(promise).rejects.toThrow(new TypeParamError('Email'));
  });
  it('should to throw if repo return a user with email equal', async () => {
    findRepo.get.mockResolvedValueOnce(mockCreate);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new AlreadyExists('Client'));
  });

  it('shoul to throw if repo return database error message', () => {
    findRepo.get.mockResolvedValueOnce(DATABASE_ERROR);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new DatabaseError());
  });
});
