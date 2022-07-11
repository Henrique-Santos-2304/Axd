import {
  encryptedPasswordMessage,
  EncrypterError,
} from '@errors/error-encrypter';
import { ITelephoneValidator, IEmailValidator } from '@utils/validator';
import { mock, MockProxy } from 'jest-mock-extended';
import { IGetByDataBaseRepo, ICreateBaseRepo } from 'src/infra/repository';
import {
  DatabaseError,
  DATABASE_ERROR,
  AlreadyExists,
  TypeParamError,
  ValidatorError,
  VALIDATOR_ERROR,
} from '@errors/index';
import {
  CreateClientService,
  ICreateClientModel,
  ICreateClientService,
} from '@useCases/client';
import { IEncryptedPassword } from '@utils/encrypter/interfaces/interface-encrypted';
import { EncryptPassword } from '@utils/encrypter/encryp-password';

describe('Create Client Service', () => {
  let service: ICreateClientService;
  let findRepo: MockProxy<IGetByDataBaseRepo>;
  let createRepo: MockProxy<ICreateBaseRepo>;
  let validateEmail: MockProxy<IEmailValidator>;
  let validateTelephone: MockProxy<ITelephoneValidator>;
  let encrypter: MockProxy<IEncryptedPassword>;

  const mockCreate: ICreateClientModel = {
    name: 'mock',
    password: '1234',
    age: 28,
    email: 'mock@example.com',
    telephone: '123',
  };

  beforeAll(() => {
    findRepo = mock();
    createRepo = mock();
    validateEmail = mock();
    validateTelephone = mock();
    encrypter = mock();

    service = new CreateClientService(
      findRepo,
      createRepo,
      validateEmail,
      validateTelephone,
      encrypter,
    );

    findRepo.get.mockResolvedValue(undefined);
    createRepo.create.mockResolvedValue({ ...mockCreate, id: '1' });
    validateEmail.validate.mockReturnValue(true);
    validateTelephone.validate.mockReturnValue(true);
    encrypter.encrypt.mockResolvedValue('password_encrypted');
  });
  // Use Case
  it('should service start to have been caleed with data received', async () => {
    const fn = jest.spyOn(service, 'start');
    await service.start(mockCreate);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(mockCreate);
  });
  // Test Email Validator
  it('should Email validtor to have been caleed with data received', async () => {
    const fn = jest.spyOn(validateEmail, 'validate');
    await service.start(mockCreate);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ email: mockCreate.email });
  });
  it('should to throw if email validator is ocurred error', async () => {
    validateEmail.validate.mockReturnValueOnce(VALIDATOR_ERROR);
    const promise = service.start({ ...mockCreate, email: 'email_notvalid' });
    expect(promise).rejects.toThrow(new ValidatorError('Email'));
  });
  it('should to throw if email type not valid', async () => {
    validateEmail.validate.mockReturnValueOnce(false);
    const promise = service.start({ ...mockCreate, email: 'email_notvalid' });
    expect(promise).rejects.toThrow(new TypeParamError('Email'));
  });

  //Test Telephone Validator
  it('should telephone validtor to have been caleed with data received', async () => {
    const fn = jest.spyOn(validateTelephone, 'validate');
    await service.start(mockCreate);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ telephone: mockCreate.telephone });
  });
  it('should to throw if telephone validator is ocurred error', async () => {
    validateTelephone.validate.mockReturnValueOnce(VALIDATOR_ERROR);
    const promise = service.start({
      ...mockCreate,
      email: 'telophone_notvalid',
    });
    expect(promise).rejects.toThrow(new ValidatorError('Telephone'));
  });
  it('should to throw if telephone type not valid', async () => {
    validateTelephone.validate.mockReturnValueOnce(false);

    const promise = service.start({
      ...mockCreate,
      email: 'telephone_not_valid',
    });
    expect(promise).rejects.toThrow(new TypeParamError('Telephone'));
  });

  // Tests Check user already exists
  it('should find client repo to have been caleed with data received', async () => {
    const fn = jest.spyOn(findRepo, 'get');
    await service.start(mockCreate);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      table: 'client',
      column: 'email',
      where: mockCreate.email,
    });
  });
  it('should to throw if repo return a user with email equal', async () => {
    findRepo.get.mockResolvedValueOnce(mockCreate);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new AlreadyExists('Client'));
  });

  it('shoul to throw if encrypter return encrypted error message', () => {
    encrypter.encrypt.mockResolvedValueOnce(encryptedPasswordMessage);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new EncrypterError());
  });
  it('shoul to throw if repo return database error message', () => {
    findRepo.get.mockResolvedValueOnce(DATABASE_ERROR);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new DatabaseError());
  });

  //Test create Client
  it('should create client to have been caleed with data received and password encrypted', async () => {
    const fn = jest.spyOn(createRepo, 'create');
    await service.start(mockCreate);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      table: 'client',
      data: { ...mockCreate, password: 'password_encrypted' },
    });
  });
  it('should to throw if repo create return database error message', async () => {
    createRepo.create.mockResolvedValueOnce(DATABASE_ERROR);

    const promise = service.start(mockCreate);
    expect(promise).rejects.toThrow(new DatabaseError());
  });

  it('shoul return a new client with data valids', async () => {
    const promise = await service.start(mockCreate);
    console.log(promise);
    expect(promise).toStrictEqual({ status: 'OK' });
  });
});
