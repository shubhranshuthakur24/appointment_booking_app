import { AppDispatch } from '../store';
import { setDoctors, setError, setLoading } from '../store/doctorSlice';
import { mockFetchDoctors } from '../services/mockApi';

export const loadDoctors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const doctors = await mockFetchDoctors();
    dispatch(setDoctors(doctors));
  } catch (error) {
    dispatch(setError('Unable to load doctors.'));
  } finally {
    dispatch(setLoading(false));
  }
};
