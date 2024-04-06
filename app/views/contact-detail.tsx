/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  fetchContacts,
  fetchContact,
  deleteContact,
  updateContact,
} from '../redux/action/action';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DimHeight, DimWidth} from '../helpers/size';

export const ContactDetail = (props: any) => {
  const {contactDetail, route, navigation} = props;

  useEffect(() => {
    getEntities();
  }, []);

  const getEntities = () => {
    props.fetchContact(route.params.id);
  };

  return (
    <View style={styles.container}>
      {Object.keys(contactDetail).length > 0 ? (
        <>
          <View>
            {contactDetail.photo.startsWith('file') ? (
              <View>
                <ImageBackground
                  source={{uri: contactDetail ? contactDetail.photo : ''}}
                  style={{...styles.backgroundImage}}>
                  <View style={styles.buttonEdit}>
                    <TouchableOpacity style={{marginHorizontal: 20}}>
                      <FontAwesome name="star" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ContactUpdate', {
                          id: contactDetail.id,
                        });
                      }}>
                      <FontAwesome name="pencil" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <View
                style={{...styles.backgroundImage, backgroundColor: '#2596be'}}>
                <View style={styles.buttonEdit}>
                  <TouchableOpacity style={{marginHorizontal: 20}}>
                    <FontAwesome name="star" size={20} color="#ff8404" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ContactUpdate', {
                        id: contactDetail.id,
                      });
                    }}>
                    <FontAwesome name="pencil" size={20} color="#ff8404" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={styles.card}>
            <View style={{top: DimHeight(3)}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.mainText}>
                  {contactDetail.firstName + ' ' + contactDetail.lastName}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={{fontSize: 18, color: 'grey'}}>Mobile</Text>
                <Text style={styles.mainTextContent}>+62821-1221-2112</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text
                  style={{fontSize: 15, color: 'grey', alignSelf: 'center'}}>
                  Age
                </Text>
                <Text style={styles.mainTextContent}>{contactDetail.age}</Text>
              </View>
              <View style={styles.sim}>
                <FontAwesome5 name="sim-card" size={19} color="#ff8404" />
                <Text style={{fontSize: 16, color: 'white'}}>
                  Call with default : SIM 1
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <FontAwesome5
                  style={styles.iconCall}
                  name="phone"
                  size={25}
                  color="#ff8404"
                />
                <FontAwesome5
                  style={styles.iconCall}
                  name="video"
                  size={25}
                  color="#ff8404"
                />
                <FontAwesome5
                  style={styles.iconCall}
                  name="sms"
                  size={25}
                  color="#ff8404"
                />
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: DimHeight(-3),
    elevation: 9,
    shadowColor: '#014c75',
  },
  backgroundImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainText: {
    fontSize: DimWidth(8),
    color: '#262626',
    paddingVertical: DimHeight(1),
    marginBottom: 25,
  },
  mainTextContent: {
    fontSize: DimWidth(5),
    color: '#262626',
  },
  mainIcon: {
    alignSelf: 'center',
    left: DimWidth(5),
    paddingRight: DimWidth(9),
  },
  iconCall: {
    alignSelf: 'center',
    paddingHorizontal: DimWidth(9),
    paddingVertical: DimWidth(9),
  },
  buttonEdit: {
    alignSelf: 'flex-end',
    bottom: DimHeight(6),
    right: DimWidth(7),
    flexDirection: 'row',
  },
  buttonCall: {
    position: 'absolute',
    top: DimHeight(1),
    right: DimWidth(7),
    display: 'flex',
    flexDirection: 'row',
  },
  sim: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    backgroundColor: '#2596be',
    width: DimHeight(30),
    marginTop: DimHeight(3),
    paddingVertical: DimHeight(1),
    borderRadius: 30,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({contactReducer}: any) => ({
  contactDetail: contactReducer.contact,
});

const mapDispatchToProps = {
  fetchContacts,
  fetchContact,
  deleteContact,
  updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
