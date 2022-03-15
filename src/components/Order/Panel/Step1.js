import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Step1(props) {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>props.navigation.push('Step2')}>

            <Text>Step1</Text>
          </TouchableOpacity>
    </View>
  )
}