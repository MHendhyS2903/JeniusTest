const contactState = {
  contacts: [],
  contact: {},
  loading: true,
  error: null,
};
export default function contactReducer(state = contactState, action: any) {
  switch (action.type) {
    case 'contact/fetchContacts':
      return {
        ...state,
        contacts: action.payload.data,
      };
    case 'contact/contactDetail':
      return {
        ...state,
        contact: action.payload.data,
      };
    case 'contact/createContact':
      return {
        ...state,
        contact: action.payload,
      };
    case 'contact/editContact':
      return {
        ...state,
        contact: action.payload,
      };
    case 'contact/deleteContact':
      return {
        ...state,
        contact: action.payload,
      };
    case 'error/setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'loading/setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
