import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const DimHeight = (size: any) =>
  heightPercentageToDP(size.toString() + '%');
export const DimWidth = (size: any) =>
  widthPercentageToDP(size.toString() + '%');
