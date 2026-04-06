import { login, signup } from '../../src/controllers/authController';
import { setAuth, setError, setLoading } from '../../src/store/authSlice';

jest.mock('../../src/services/mockApi', () => ({
  mockLogin: jest.fn(),
  mockSignup: jest.fn(),
}));

const { mockLogin, mockSignup } = jest.requireMock('../../src/services/mockApi');

const user = { id: 'u1', fullName: 'Alex Doe', phone: '9999999999' };

const collectDispatches = () => {
  const actions: any[] = [];
  const dispatch = (action: any) => {
    actions.push(action);
    return action;
  };
  return { actions, dispatch };
};

describe('authController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches login success flow', async () => {
    mockLogin.mockResolvedValue({ token: 'token', user });
    const { actions, dispatch } = collectDispatches();

    await login('9999999999')(dispatch as any);

    expect(actions[0]).toEqual(setLoading(true));
    expect(actions[1]).toEqual(setError(null));
    expect(actions[2]).toEqual(setAuth({ token: 'token', user }));
    expect(actions[actions.length - 1]).toEqual(setLoading(false));
  });

  it('dispatches signup success flow', async () => {
    mockSignup.mockResolvedValue({ token: 'token', user });
    const { actions, dispatch } = collectDispatches();

    await signup('Alex Doe', '9999999999')(dispatch as any);

    expect(actions[0]).toEqual(setLoading(true));
    expect(actions[1]).toEqual(setError(null));
    expect(actions[2]).toEqual(setAuth({ token: 'token', user }));
    expect(actions[actions.length - 1]).toEqual(setLoading(false));
  });
});
