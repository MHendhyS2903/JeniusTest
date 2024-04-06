import Snackbar from 'react-native-snackbar';

export const showSnackBar = (message: any, status: any) => {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      backgroundColor: status === 'success' ? 'green' : 'red',
    });
  }, 1000);
};
