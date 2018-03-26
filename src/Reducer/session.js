export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SESSION_SET':
      return payload;
    case 'SESSION_CREATE':
      return [payload, ...state];
    case 'SESSION_UPDATE':
      return state.map(item => (item.id === payload.id ? payload : item));
    case 'SESSION_DELETE':
      return state.filter(item => item.id !== payload.id);
    default:
      return state;
  }
};
