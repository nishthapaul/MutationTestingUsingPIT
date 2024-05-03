import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Button, Modal} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { init, db } from '../Database/database';  
import DoctorsRecommendation from './DoctorRecommendation';
const CustomCheckbox = ({ labelValue, index, question, responseList, setResponseList }) => {
    const [isChecked, setIsChecked] = useState(false); // Manage checked state

    
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // Update responseList based on checked status
    const updatedResponses = { ...responseList };
    const key = question;
    if (updatedResponses.hasOwnProperty(key)) {
      // Question already exists in responseList, update the value
      updatedResponses[key] = isChecked ? null : labelValue; // Toggle labelValue based on isChecked
    } else {
      // Question is not in responseList, add a new entry
      updatedResponses[key] = isChecked ? null : labelValue;
    }
    // updatedResponses[question] = isChecked ? null : labelValue;
    setResponseList(updatedResponses);
  }; // Update state on click
  
    isChecked && console.log("someting is checked");

    // Function to retrieve selected values (if needed)
    const getSelectedData = () => isChecked ? labelValue : null; // Return label if checked
  
    

    return (
      <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
        <CheckBox
          checked={isChecked}
          iconRight
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checkedColor="green" 
          uncheckedColor="black"
          containerStyle={styles.checkbox}
          onPress={handleCheckboxChange}
        />
        <Text style={styles.label}>{labelValue}</Text>
      </View>
    );
  };

  const ConsentCheckbox = ({ labelValue, index, consent, setConsent }) => {

    
  const handleConsentChange = () => {
    setConsent(!consent);
  }  
    return (
      <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
        <CheckBox
          checked={consent}
          iconRight
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checkedColor="green" 
          uncheckedColor="black"
          containerStyle={styles.checkbox}
          onPress={handleConsentChange}
        />
        <Text style={styles.label}>{labelValue}</Text>
      </View>
    );
  };

const CustomRadioButton = ({ labelValue, index, isSelected, onPress }) => {
  return (
    <Pressable onPress = {onPress} key={`${labelValue}-${index}`}>
        <View style={styles.radiowrapper}>
            <View style={[styles.radio, isSelected && styles.radioSelected]}></View>
            <Text style={styles.radioText}>{labelValue}</Text>
            </View>
    </Pressable>
  );
};

export default FWForm = ({ saveModal, fwId }) => {
  const [data, setData] = useState([]);
  const [formDefinition, setFormDefinition] = useState({});
//  const [formId, setFormId] = useState('');
  const [fwNumber, setFWNumber] = useState('');
  const [pNumber, setpNumber] = useState('');
  const [aabhaNumber, setAabhaNumber] = useState('');
  const [fName, setFName] = useState('');
  const [mName, setMName] = useState('');
  const [lName, setLName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedFormType, setSelectedFormType] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [responseList , setResponseList] = useState({}); 
  const [healthStatus, setHealthStatus] = useState('');
  const [unhealthy , setUnhealthy] = useState(false);
  const [consent , setConsent] = useState(false);
  const [taluka, setTaluka] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibledoc, setIsModalVisibledoc] = useState(false);

  console.log("responselist" , responseList);

  const showModal = () => {
    console.log("Show Modal");
    setIsModalVisible(true);
  };

  // const saveModal = () => {
  //   console.log("Save Modal");
  //   setIsModalVisible(false);
  // };
  const showModaldoc = () => {
    console.log("Show Modal");
    setIsModalVisibledoc(true);
  };
  const saveModaldoc = () => {
    console.log("Save Modal");
    setIsModalVisibledoc(false);
  };

  useEffect(() => {
    const fetchFormDetails = async () => {
      console.log("in");
      try {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM forms WHERE selected = 1',
            [],
            (_, result) => { // Corrected to include the transaction object "_"
              console.log("inside results"); // Now this should correctly log
              const fetchedData = result.rows._array;
              console.log('_______________________________________________');    
              console.log("Form Data: ", fetchedData);
              if (fetchedData) {
                setData(fetchedData[0]); // Assuming you want the first match or there's only one match
              } else {
                console.log('No data Form');
              }
              const formObject = JSON.parse(fetchedData[0].formDefinition);
              setFormDefinition(formObject);
            },
            (_, err) => {
              console.log('Failed to fetch selected user data from Form table:', err);
            }
          );
        });
      } catch (error) {
        console.error("Error fetching Form details:", error);
        alert('Failed to fetch Form details.');
      }
    };
    fetchFormDetails();
  }, []);

  // useEffect(() => {
  //   const recdoctors = async () => {
  //     console.log("in");
  //     try {
  //       db.transaction((tx) => {
  //         tx.executeSql(
  //           'SELECT * FROM recommendations',
  //           [],
  //           (_, result) => { // Corrected to include the transaction object "_"
  //             console.log("inside results"); // Now this should correctly log
  //             const fetchedRec = result.rows._array;
  //             console.log('_______________________________________________');    
  //             console.log("Recommendations Data: ", fetchedRec);
  //             if (fetchedRec) {
  //               setData(fetchedRec[0]); // Assuming you want the first match or there's only one match
  //             } else {
  //               console.log('No data recommendations');
  //             }
  //             // const formObject = JSON.parse(fetchedRec[0].formDefinition);
  //             // setFormDefinition(formObject);
  //           },
  //           (_, err) => {
  //             console.log('Failed to fetch selected user data from Form table:', err);
  //           }
  //         );
  //       });
  //     } catch (error) {
  //       console.error("Error fetching Form details:", error);
  //       alert('Failed to fetch Form details.');
  //     }
  //   };
  //   recdoctors();
  // }, []);

  const handleRadioSelection = (labelValue) => {
    setSelectedFormType(labelValue);
  };
  const handleHealthStatus = (labelValue) => {
    setHealthStatus(labelValue);
    if(labelValue === "Healthy")
        setUnhealthy(false);
    else
        setUnhealthy(true);
  };


  const handleOnSubmitForm = async () => {
    const formData = {
      formId: data.formId,
      fwNumber: fwId,
      pNumber: null,
      fName,
      mName,
      lName,
      age,
      unhealthy: unhealthy ? 1 : 0, 
      gender,
      bloodGroup,
      address,
      responseList: JSON.stringify(responseList),
      consent: consent ? 1 : 0, // Convert boolean to integer
      taluka,
      phoneNumber,
      formType: "Regular",
      aabhaNumber
    };

          try {
            await db.transaction(async (tx) => {
              await tx.executeSql(
          `INSERT INTO formResponseforPatient (formId, fwNumber, pNumber, fName, mName, lName, age,unhealthy, gender, bloodGroup, address, responseList, consent, talukaName, phoneNumber, formType, aabhaNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,// Ensure the SQL matches the fields
          [
          formData.formId,
          formData.fwNumber,
          formData.pNumber,

          formData.fName,
          formData.mName,
          formData.lName,

          formData.age,
          formData.unhealthy,
          formData.gender,
          formData.bloodGroup,

          formData.address,
          formData.responseList,

          formData.consent,
          formData.taluka,
          formData.phoneNumber,

          formData.formType,
          formData.aabhaNumber

          ],
          (_, result) => console.log('patient form inserted successfully'),
          (_, err) => console.log('Failed to insert data', err)
        );
      });
    } catch (error) {
      console.error('Error while inserting data:', error);
    }
    saveModal();
  };

  const questions =  formDefinition.questions;
  return (
    <View style={styles.container}>
      <View style={styles.quesCard}>
        <View style = {{flexDirection : 'row'}}>
        <Text style={styles.title}>Title: {data.title}</Text>
        <Button title = "Close" onPress = {saveModal}/>
          </View>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Description:</Text> {formDefinition.description}
        </Text>
        <Text style={styles.specialisation}>
          <Text style={{ fontWeight: 'bold' }}>Specialisation:</Text> {data.specialisationName}
        </Text>
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false}>
      <View style={styles.quesCard}>
        <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Form Id:</Text> {data.formId}
          </Text>
        </View>
        <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Form Type:</Text>
          </Text>
          <Text>Regular</Text>
          {/* <CustomRadioButton
            labelValue="Regular"
            key={1}
            isSelected={selectedFormType === 'Regular'} // Set based on state
            onPress={() => handleRadioSelection('Regular')}
          />
          <CustomRadioButton
            labelValue="Follow-Up"
            key={2}
            isSelected={selectedFormType === 'Follow-Up'} // Set based on state
            onPress={() => handleRadioSelection('Follow-Up')}
          /> */}
          {/* {selectedFormType && <Text>Selected Form Type: {selectedFormType}</Text>} */}
        </View>
        <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Field Worker Number:</Text> {fwId}
          </Text>
          {/* <TextInput
            style={styles.textInput}
            placeholder="Enter Field Worker Number"
            value={fwNumber}
            onChangeText={(text) => setFWNumber(text)}
          /> */}
        </View>
        <View style={styles.section}>
      <Text style={styles.sectionTitle}>Patient Details</Text>
    </View>
    <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Aabha Number:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Aabha Number"
            value={aabhaNumber}
            onChangeText={(text) => setAabhaNumber(text)}
          />
        </View>
        <View style = {[styles.formId, {gap:20}]}>
        <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>First Name:</Text>
          </Text>
        <TextInput
            style={styles.textInput}
            placeholder="Enter First Name"
            value={fName}
            onChangeText={(text) => setFName(text)}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Middle Name:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Middle Name"
            value={mName}
            onChangeText={(text) => setMName(text)}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Last Name:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Last Name"
            value={lName}
            onChangeText={(text) => setLName(text)}
          />
        </View>
        <View style={[styles.formId, {gap:90}]}>
          <Text style={styles.text}>  
            <Text style={{ fontWeight: 'bold' }}>Age:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Age"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold'}}>Gender:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Blood Group:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Blood Group"
            value={bloodGroup}
            onChangeText={(text) => setBloodGroup(text)}
          />
        </View>
        <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}> Address:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.formId}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}> Taluka:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Taluka"
            value={taluka}
            onChangeText={(text) => setTaluka(text)}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}> PhoneNumber:</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter PhoneNumber"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={[styles.section, {marginTop:10}]}>
      <Text style={[styles.sectionTitle]}> Questions </Text>
    </View>
      {questions && questions.map((item, index) => (
                    <View key={`${item.number}-${index}`}>
                        <View>
                            <View style = {{marginTop: 10}}>
                                <Text style={styles.questions}>{`${item.number}: ${item.question}`}</Text>
                            </View>
                            {item?.values && item.values.map((value, idx) => (
                                item.optionType == 'CheckBox' ?
                                <CustomCheckbox labelValue={value} key={`${item.number}-${item.optionType}-${idx}`} 
                                question = {item.question}
                                responseList={responseList}
                                setResponseList={setResponseList}/>:
                                <CustomRadioButton labelValue={value} key={`${item.number}-${item.optionType}-${idx}`} />

                            ))}
                        </View>
                    </View>
                ))}
                <View>
                </View>
                <View style={[styles.formId , {backgroundColor: '#f2f2f2'}]}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Health Status:</Text>
          </Text>
          <CustomRadioButton
            labelValue="Healthy"
            key={1}
            isSelected={healthStatus === 'Healthy'} // Set based on state
            onPress={() => handleHealthStatus('Healthy')}
          />
          <CustomRadioButton
            labelValue="UnHealthy"
            key={2}
            isSelected={healthStatus === 'UnHealthy'} // Set based on state
            onPress={() => handleHealthStatus('UnHealthy')}
          />
          {/* {selectedFormType && <Text>Selected Form Type: {selectedFormType}</Text>} */}
        </View>
        <View style={[styles.formId , {margin : 10}]}>
               <ConsentCheckbox
               labelValue= "Do you want to share your health details?"
               key={1}
               consent={consent}
              setConsent={setConsent}/>
          </View>
                <View>
                  <Button title = "submit" onPress = {handleOnSubmitForm}/>
                </View>
                <View>
                  <Button title = "Recommend Doctors" onPress = {showModaldoc}/>
                </View>
                <Modal visible={isModalVisibledoc} transparent animationType="slide">
                  <DoctorsRecommendation saveModaldoc={saveModaldoc}/>
                  {/* <View><Text>Hey</Text></View> */}
                </Modal>
            </View>
            </ScrollView>
            </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  quesCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  specialisation: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  text: {
    marginRight: 10,
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
  formId: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  radioText: {
    fontSize:16,
},
radio: {
    height:14,
    width:14,
    borderColor:'black',
    borderWidth: 2,
    borderRadius: 9,
    margin: 10,
},
radioSelected: {
    backgroundColor: '#80ccff',
  },

radiowrapper: {
    flexDirection:'row',
    alignItems:'center',
},
section: {
    backgroundColor: '#f2f2f2', 
    padding: 10,
    marginBottom: 10,
    alignItems:'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questions: {
    fontSize: 20,
},
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
checkbox: {
  backgroundColor: 'transparent',
  borderWidth: 0, 
  padding: 0, 
  marginLeft: 0, 
},
label: {
  marginLeft: 10,
  fontSize: 16,
}
});