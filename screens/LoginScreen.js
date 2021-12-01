import React from 'react';
import { StyleSheet, Text, View, Image,KeyboardAvoidingView,TextInput,TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
        }
    }

    login=async(email,password)=>{
        if (email && password){
          try{
            console.log("Pressed")
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              this.props.navigation.navigate('Transaction')
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                alert("user dosen't exists")
                console.log("doesn't exist")
                break
              case 'auth/invalid-email':
                alert('incorrect email or password')
                console.log('invaild')
                break
            }
          }
        }
        else{
            alert('enter email and password');
        }
      }
  render(){
    return (
        <KeyboardAvoidingView style={{alignItems:"center",marginTop:20,}}>
        <View>
            <Text style={{alignItems:"center",justifyContent:"center",fontSize:60,fontFamily:"serif"}}>Willy</Text>
        </View>
        <View style={{flex:1,marginTop:200}}>
            <TextInput style={{width:200,height:40,borderWidth:2,borderColor:"blue",backgroundColor:"lightblue",marginBottom:15}}
            placeholder="abcd@gmail.com"
            keyboardType="email-address"
            onChangeText={(text)=>{
                this.setState({emailId:text})
            }}
            />
                

            <TextInput
            style={{width:200,height:40,borderWidth:2,borderColor:"blue",backgroundColor:"lightblue"}}
            secureTextEntry={true}
            placeholder="enter your password"
            
            onChangeText={(text)=>{
                this.setState({password:text})
            }}
            />
        </View>
        <View>
            <TouchableOpacity style={{width:150,height:40,backgroundColor:"green",color:"white",borderWidth:2,borderColor:"black",borderRadius:7,marginTop:15,justifyContent:"center",alignSelf:"center"}}
                   onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
                    
                    <Text style={{textAlign:"center",color:"white",}}> Log in</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
  }
}
