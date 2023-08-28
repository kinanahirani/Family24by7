import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CAddCircleModal = () => {
    const {
        control,
        handleSubmit,
        getValues,
        formState: {errors, isValid},
      } = useForm({
        defaultValues: {
          circleName: '',
        },
      });

      const [createCircleModalVisible, setCreateCircleModalVisible] =
      useState(false);
  return (
    <Modal
          animationType="fade"
          transparent={true}
          visible={createCircleModalVisible}
          onRequestClose={() => {
            setCreateCircleModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name your Circle</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Please enter circle name.',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <TextInput
                      multiline
                      mode="flat"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.textInput}
                      error={errors.circleName}
                    />
                    {errors.circleName && (
                      <HelperText
                        type="error"
                        style={{
                          alignSelf: 'flex-start',
                          marginBottom: verticalScale(10),
                        }}>
                        {errors.circleName.message}
                      </HelperText>
                    )}
                  </>
                )}
                name="circleName"
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Pressable
                  style={[styles.button, {marginRight: horizontalScale(10)}]}
                  onPress={() => setCreateCircleModalVisible(false)}>
                  <Text style={styles.textStyle}>BACK</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, {marginLeft: horizontalScale(10)}]}
                  onPress={handleSubmit(handleCreateCircle)}>
                  <Text style={styles.textStyle}>CREATE</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
  )
}

export default CAddCircleModal

const styles = StyleSheet.create({})