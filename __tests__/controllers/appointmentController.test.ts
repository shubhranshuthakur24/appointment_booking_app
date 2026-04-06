import { bookAppointment } from '../../src/controllers/appointmentController';
import { addAppointment, setError, setLoading } from '../../src/store/appointmentSlice';

jest.mock('../../src/services/mockApi', () => ({
  mockBookAppointment: jest.fn(),
}));

const { mockBookAppointment } = jest.requireMock('../../src/services/mockApi');

const collectDispatches = () => {
  const actions: any[] = [];
  const dispatch = (action: any) => {
    actions.push(action);
    return action;
  };
  return { actions, dispatch };
};

describe('appointmentController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(123456);
  });

  afterEach(() => {
    (Date.now as jest.Mock).mockRestore();
  });

  it('books appointment and dispatches add', async () => {
    const payload = {
      userId: 'u1',
      department: 'ENT',
      doctorId: 'd1',
      doctorName: 'Dr Shyam',
      date: '2026-04-05',
      time: '09:00',
    };

    mockBookAppointment.mockImplementation(async (appt: any) => appt);

    const { actions, dispatch } = collectDispatches();

    await bookAppointment(payload)(dispatch as any, () => ({} as any));

    expect(actions[0]).toEqual(setLoading(true));
    expect(actions[1]).toEqual(setError(null));

    const addAction = actions.find((action) => action.type === addAppointment.type);
    expect(addAction.payload.status).toBe('Booked');
    expect(addAction.payload.id).toBe('a_123456');

    expect(actions[actions.length - 1]).toEqual(setLoading(false));
  });
});
