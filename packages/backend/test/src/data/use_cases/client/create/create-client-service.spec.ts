import { CreateClientService } from '@useCases/client/create/create.service';
import { ICreateClientModel } from '@useCases/client/create/interfaces/create-client-model';
import { ICreateClientService } from '@useCases/client/create/interfaces/service-interface';
import { MockProxy } from 'jest-mock-extended';

describe('Create Client Service', () => {
  let service: ICreateClientService;
  const mockCreate: ICreateClientModel = {
    name: 'mock',
    password: '1234',
    age: 28,
    email: 'mock@example.com',
    telephone: '123',
  };

  beforeAll(() => {
    service = new CreateClientService();
  });

  it('should expect received error if user already exist', () => {
    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow();
  });
});
