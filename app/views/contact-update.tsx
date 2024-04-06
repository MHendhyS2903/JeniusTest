/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  fetchContacts,
  fetchContact,
  createContact,
  deleteContact,
  updateContact,
} from '../redux/action/action';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DimHeight, DimWidth} from '../helpers/size';
import {showSnackBar} from '../helpers/snackBar';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  PermissionsAndroid,
  Pressable,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';

export const ContactUpdate = (props: any) => {
  const dispatch = useDispatch();
  const {route, navigation, contactDetail} = props;
  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [image, setImage] = React.useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(route.params);

  useEffect(() => {
    if (isEdit) {
      fetchContact(route.params.id);
      onChangeFirstName(contactDetail.firstName);
      onChangeLastName(contactDetail.lastName);
      onChangeAge(contactDetail.age.toString());
      setImage(contactDetail.photo);
    }
  }, []);

  const requestCameraPermission = async (type: any, options: any) => {
    setModalVisible(!modalVisible);
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.CAMERA'] &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE']
      ) {
        console.log('Camera permission given');
        if (type === 'capture') {
          launchCamera(options, res => {
            if (res.didCancel) {
              console.log('cancelled');
            } else if (res.errorCode) {
              console.log(res.errorMessage);
            } else {
              const data = res.assets;
              if (data) {
                data.forEach(img => {
                  setImage(img.uri);
                });
              }
            }
          });
        } else {
          launchImageLibrary(options, res => {
            if (res.didCancel) {
              console.log('cancelled');
            } else if (res.errorCode) {
              console.log(res.errorMessage);
            } else {
              const data = res.assets;
              if (data) {
                data.forEach(img => {
                  setImage(img.uri);
                });
              }
            }
          });
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const submitHandler = () => {
    if (
      typeof firstName === 'undefined' ||
      firstName === null ||
      firstName.trim() === '' ||
      typeof lastName === 'undefined' ||
      lastName === null ||
      lastName.trim() === '' ||
      typeof age === 'undefined' ||
      age === null ||
      age.trim() === '' ||
      typeof image === 'undefined' ||
      image === null ||
      image.trim() === ''
    ) {
      showSnackBar('Data Tidak Boleh Kosong', 'mandatory');
    } else {
      if (!isEdit) {
        const payload = {
          firstName,
          lastName,
          age,
          photo: image,
        };
        createContact(dispatch, payload);
      } else {
        const payload = {
          firstName,
          lastName,
          age,
          photo: image,
        };
        updateContact(dispatch, payload, contactDetail.id);
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {actions.map(({title, type, options}) => {
              return (
                <TouchableOpacity
                  key={title}
                  onPress={() => requestCameraPermission(type, options)}>
                  <View style={[styles.formInput, styles.actionButton]}>
                    <Text style={styles.textButton}>{title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesome name="times" size={18} color="red" />
            </Pressable>
          </View>
        </View>
      </Modal>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{backgroundColor: 'white', paddingTop: DimHeight(6)}}>
            <View style={styles.pictureContainer}>
              {image != null ? (
                <View style={styles.pictureContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image style={styles.picture} source={{uri: image}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: Dimensions.get('screen').width}}
                    onPress={() => {
                      setImage(null);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        padding: 5,
                      }}>
                      <FontAwesome
                        name="close"
                        size={DimWidth(5)}
                        color="#ff040c"
                        style={{alignSelf: 'flex-end'}}
                      />
                      <Text style={{alignSelf: 'flex-end'}}>Delete Image</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="camera" size={80} color="#ff8404" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputLabel}>
                <FontAwesome name="user" size={18} color="#ff8404" />
                <Text style={styles.formLabel}>First Name</Text>
              </View>
              <TextInput
                style={styles.formInput}
                onChangeText={onChangeFirstName}
                value={firstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputLabel}>
                <FontAwesome name="user" size={18} color="#ff8404" />
                <Text style={styles.formLabel}>Last Name</Text>
              </View>
              <TextInput
                style={{...styles.formInput}}
                onChangeText={onChangeLastName}
                value={lastName}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputLabel}>
                <FontAwesome5 name="birthday-cake" size={18} color="#ff8404" />
                <Text style={styles.formLabel}>Age</Text>
              </View>
              <TextInput
                style={{...styles.formInput}}
                onChangeText={onChangeAge}
                value={age}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                paddingHorizontal: DimWidth(5),
                paddingVertical: DimWidth(9),
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.formInput, styles.saveButton]}
                onPress={() => {
                  submitHandler();
                }}>
                <Text style={styles.textButton}>Save Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picture: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * (60 / 100),
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formLabel: {
    fontSize: DimWidth(3.5),
    paddingLeft: DimWidth(3),
    color: 'black',
    marginBottom: DimHeight(1),
  },
  formInput: {
    elevation: 3,
    fontSize: DimWidth(3.5),
    padding: DimWidth(3),
    height: DimHeight(5.5),
    color: 'black',
    borderRadius: 5,
    backgroundColor: '#eeeeee',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height * (15 / 100),
  },
  modalView: {
    backgroundColor: '#F9F5F6',
    borderRadius: 5,
    paddingVertical: DimWidth(2),
    width: 300,
    height: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
  },
  button: {
    paddingTop: 4,
    paddingRight: 5,
  },
  buttonClose: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  modalText: {
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: DimWidth(5),
  },
  inputContainer: {
    paddingTop: DimHeight(1),
    paddingHorizontal: DimWidth(5),
  },
  inputLabel: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#2596be',
    alignItems: 'center',
    width: 150,
    margin: 5,
  },
  saveButton: {
    backgroundColor: '#2596be',
    alignItems: 'center',
  },
  textButton: {
    fontSize: DimWidth(3.5),
    fontWeight: '700',
    color: 'white',
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take photo',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Choose photo',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take photo',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
    },
  });
}

const mapStateToProps = ({contactReducer}: any) => ({
  contactDetail: contactReducer.contact,
});

const mapDispatchToProps = {
  fetchContacts,
  fetchContact,
  createContact,
  deleteContact,
  updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdate);
