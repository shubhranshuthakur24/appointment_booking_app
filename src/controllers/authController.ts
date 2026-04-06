import { AppDispatch } from '../store';
import { setAuth, setError, setLoading, logout as logoutAction } from '../store/authSlice';
import { mockLogin, mockSignup } from '../services/mockApi';

export const login = (phone: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const result = await mockLogin(phone);
    dispatch(setAuth(result));
  } catch (error) {
    dispatch(setError('Login failed. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const signup = (fullName: string, phone: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const result = await mockSignup(fullName, phone);
    dispatch(setAuth(result));
  } catch (error) {
    dispatch(setError('Signup failed. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(logoutAction());
};
