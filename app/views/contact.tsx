/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  fetchContacts,
  deleteContact,
  updateContact,
} from '../redux/action/action';
import {DimHeight, DimWidth} from '../helpers/size';
import {getColorByLetter} from '../helpers/color';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Contact = (props: any) => {
  const {contactList, navigation} = props;
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    getAllEntities();
  }, []);

  const getAllEntities = () => {
    props.fetchContacts();
  };

  const deleteItem = () => {
    setModalVisible(!modalVisible);
    deleteContact(dispatch, id);
  };

  const passId = (id: any) => {
    setId(id);
    setModalVisible(!modalVisible);
  };

  const onRefresh = () => {
    setFetchData(true);
    getAllEntities();
    setTimeout(() => {
      setFetchData(false);
    }, 1000);
  };

  const sortDataAscending = () => {
    const sortedData = contactList
      .slice()
      .sort((a: {firstName: string}, b: {firstName: string}) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    return sortedData;
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
            <Text
              style={{
                fontSize: DimWidth(5),
                color: 'black',
                paddingVertical: DimHeight(3),
              }}>
              Delete Contact ?
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => deleteItem()}>
                <FontAwesome name="check" size={20} color="#2596be" />
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome name="times" size={20} color="red" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {contactList.length > 0 ? (
        <Fragment>
          <FlatList
            data={sortDataAscending()}
            keyExtractor={item => item.id}
            onRefresh={onRefresh}
            refreshing={fetchData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ContactDetail', {id: item.id})
                }>
                <View style={styles.card}>
                  <View style={styles.infoContainer}>
                    <View style={styles.colLeft}>
                      <View style={styles.infoContainer}>
                        <View
                          style={{
                            ...styles.icon,
                            backgroundColor: getColorByLetter(
                              item.firstName[0],
                            ),
                          }}>
                          <Text style={styles.iconContent}>
                            {item.firstName[0].toUpperCase()}
                          </Text>
                        </View>
                        <Text style={styles.primaryText}>
                          {item.firstName + ' ' + item.lastName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.colRight}>
                      <TouchableOpacity
                        style={{alignSelf: 'flex-end'}}
                        onPress={() => {
                          passId(item.id);
                        }}>
                        <FontAwesome
                          name="trash"
                          size={DimWidth(6)}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={styles.addIcon}>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('ContactUpdate')}
              testID="addContactButton">
              <FontAwesome name="plus" size={DimWidth(5)} color="white" />
            </TouchableOpacity>
          </View>
        </Fragment>
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
    backgroundColor: '#F9F6EE	',
  },
  addIcon: {
    position: 'absolute',
    width: DimWidth(15),
    height: DimWidth(15),
    bottom: DimHeight(2),
    right: DimWidth(12),
    justifyContent: 'center',
    backgroundColor: '#ff8404',
    borderRadius: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 4,
    shadowColor: '#014c75',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  primaryText: {
    fontSize: DimWidth(5),
    color: 'black',
  },
  iconContent: {
    flex: 1,
    paddingVertical: 10,
    fontSize: DimWidth(5),
    color: 'white',
    marginHorizontal: 10,
  },
  imageContent: {
    flex: 1,
    borderRadius: 25,
    width: DimWidth(6),
  },
  image: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green',
  },
  colLeft: {
    flex: 1,
    width: '30%',
    fontWeight: 'bold',
  },
  colRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 10,
    padding: 10,
  },
  buttonClose: {
    marginHorizontal: DimWidth(4),
  },
  modalText: {
    borderRadius: 10,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: DimWidth(5),
  },
});

const mapStateToProps = ({contactReducer}: any) => ({
  contactList: contactReducer.contacts,
});

const mapDispatchToProps = {
  fetchContacts,
  deleteContact,
  updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
