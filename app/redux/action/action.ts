import axios from 'axios';
import {showSnackBar} from '../../helpers/snackBar';

const apiUrl = 'https://contact.herokuapp.com/contact';

export const setContacts = (payload: any) => {
  return {
    type: 'contact/fetchContacts',
    payload,
  };
};

export const setContact = (payload: any) => {
  return {
    type: 'contact/contactDetail',
    payload,
  };
};

// Actions
export const fetchContacts = () => {
  return (dispatch: any) => {
    return axios
      .get(apiUrl)
      .then(response => {
        dispatch(setContacts(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchContact = (id: any) => {
  const requestUrl = `${apiUrl}/${id}`;
  return (dispatch: any) => {
    return axios
      .get(requestUrl)
      .then(response => {
        dispatch(setContact(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createContact = async (dispatch: any, payload: any) => {
  try {
    const result = await axios.post(apiUrl, payload);
    dispatch(fetchContacts());
    showSnackBar('Success Add Contact', 'success');
    return result;
  } catch (error) {
    return showSnackBar('Failed', 'failed');
  }
};

export const deleteContact = async (dispatch: any, id: any) => {
  try {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete(requestUrl);
    dispatch(fetchContacts());
    showSnackBar('Contact Deleted', 'success');
    return result;
  } catch (error) {
    return showSnackBar('Failed', 'failed');
  }
};

export const updateContact = async (dispatch: any, payload: any, id: any) => {
  try {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.put(requestUrl, payload);
    dispatch(fetchContacts());
    dispatch(fetchContact(id));
    showSnackBar('Contact Edited', 'success');
    return result;
  } catch (error) {
    return showSnackBar('Failed', 'failed');
  }
};
