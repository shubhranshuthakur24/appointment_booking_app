import doctorReducer, { setDoctors } from '../../src/store/doctorSlice';

const doctors = [
  { id: 'd1', name: 'Dr Shyam', department: 'ENT', availability: ['Mon'] },
];

describe('doctorSlice', () => {
  it('sets doctors', () => {
    const state = doctorReducer(undefined, setDoctors(doctors));
    expect(state.list).toEqual(doctors);
  });
});
