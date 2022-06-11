const initialState = {
  isLogedIn: false,
  name: localStorage.getItem('MIU_HMS_name') || '',
  role: localStorage.getItem('MIU_HMS_role') || '',
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOG_IN':
      localStorage.setItem('MIU_HMS_token', payload.token);
      localStorage.setItem('MIU_HMS_name', payload.name);
      localStorage.setItem('MIU_HMS_role', payload.role);
      return {
        ...state,
        isLogedIn: true,
        name: payload.name,
        role: payload.role,
      };
    case 'LOG_OUT':
      localStorage.removeItem('MIU_HMS_token');
      localStorage.removeItem('MIU_HMS_name');
      localStorage.removeItem('MIU_HMS_role');
      return {
        ...state,
        isLogedIn: false,
        name: '',
        role: '',
      };
    default:
      return state;
  }
};
export default loginReducer;
