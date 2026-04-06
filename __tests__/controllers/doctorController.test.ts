import { loadDoctors } from '../../src/controllers/doctorController';
import { setDoctors, setError, setLoading } from '../../src/store/doctorSlice';

jest.mock('../../src/services/mockApi', () => ({
  mockFetchDoctors: jest.fn(),
}));

const { mockFetchDoctors } = jest.requireMock('../../src/services/mockApi');

const collectDispatches = () => {
  const actions: any[] = [];
  const dispatch = (action: any) => {
    actions.push(action);
    return action;
  };
  return { actions, dispatch };
};

describe('doctorController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches doctors loaded', async () => {
    const doctors = [{ id: 'd1', name: 'Dr Shyam', department: 'ENT', availability: ['Mon'] }];
    mockFetchDoctors.mockResolvedValue(doctors);
    const { actions, dispatch } = collectDispatches();

    await loadDoctors()(dispatch as any);

    expect(actions[0]).toEqual(setLoading(true));
    expect(actions[1]).toEqual(setError(null));
    expect(actions[2]).toEqual(setDoctors(doctors));
    expect(actions[actions.length - 1]).toEqual(setLoading(false));
  });
});
