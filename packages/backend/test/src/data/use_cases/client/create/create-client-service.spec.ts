import { AlreadyExists } from '@errors/error-data';
import { DatabaseError, DATABASE_ERROR } from '@errors/errors-database';
import { CreateClientService } from '@useCases/client/create/create.service';
import { ICreateClientModel } from '@useCases/client/create/interfaces/create-client-model';
import { ICreateClientService } from '@useCases/client/create/interfaces/service-interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { IGetByDataBaseRepo } from 'src/infra/repository/base/getByData/interface-get-by-data-repository';

describe('Create Client Service', () => {
  let service: ICreateClientService;
  let findRepo: MockProxy<IGetByDataBaseRepo>;

  const mockCreate: ICreateClientModel = {
    name: 'mock',
    password: '1234',
    age: 28,
    email: 'mock@example.com',
    telephone: '123',
  };

  beforeAll(() => {
    findRepo = mock();
    service = new CreateClientService(findRepo);

    findRepo.get.mockResolvedValue(undefined);
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
