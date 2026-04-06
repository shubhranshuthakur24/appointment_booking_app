import authReducer, { logout, setAuth, setError, setLoading } from '../../src/store/authSlice';

const user = { id: 'u1', fullName: 'Alex Doe', phone: '9999999999' };

describe('authSlice', () => {
  it('handles setLoading', () => {
    const state = authReducer(undefined, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('handles setAuth', () => {
    const state = authReducer(undefined, setAuth({ token: 'token', user }));
    expect(state.token).toBe('token');
    expect(state.user).toEqual(user);
    expect(state.error).toBeNull();
  });

  it('handles setError', () => {
    const state = authReducer(undefined, setError('Oops'));
    expect(state.error).toBe('Oops');
  });

  it('handles logout', () => {
    const seeded = authReducer(undefined, setAuth({ token: 'token', user }));
    const state = authReducer(seeded, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
