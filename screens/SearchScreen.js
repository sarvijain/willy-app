import React from 'react';
import { Text, View,FlatList,TextInput,TouchableOpacity } from 'react-native';
import db from "../config"
export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null,
      search:"",
    }
  }
  componentDidMount=async()=>{
    const query= await db.collection("transactions").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[],
        lastVisibleTransaction:doc
      })
    })
  }

fecthMoreTransactions= async ()=> {
   var text=this.state.search.toUpperCase()
  var enteredtext=text.split("")

  if(enteredtext[0].toUpperCase()=== "B"){
    const referbookId=await db.collection("transactions").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    referbookId.docs.map((doc)=>{
      this.setState({
       allTransactions:[...this.state.allTransactions, doc.data()],
       lastVisibleTransaction:doc
      })
    })
  }
   else if(enteredtext[0].toUpperCase()=== "S"){
   const referStudentId=await db.collection("transactions").where("StudentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
   referStudentId.docs.map((doc)=>{
     this.setState({
      allTransactions:[...this.state.allTransactions, doc.data()],
      lastVisibleTransaction:doc
     })
   })
 }
}

searchTransactions= async (text)=>{
   var enteredtext=text.split("")

   if(enteredtext[0].toUpperCase()=== 'B'){
     const referbookId=await db.collection("transactions").where("bookId","==",text).get()
     referbookId.docs.map((doc)=>{
       this.setState({
        allTransactions:[...this.state.allTransactions, doc.data()],
        lastVisibleTransaction:doc
       })
     })
   }
    else if(enteredtext[0].toUpperCase()=== 'S'){
    const referStudentId=await db.collection("transactions").where("studentId","==",text).get()
    referStudentId.docs.map((doc)=>{
      this.setState({
       allTransactions:[...this.state.allTransactions, doc.data()],
       lastVisibleTransaction:doc
      })
    })
  }
}
    render() {
   
      return (
        <View style={{flex:1,marginTop:5}}>
            <View   style={{backgroundColor:"white",height:30,flexDirection:'row',alignItems:"center"}}>
            <TextInput
            style={{backgroundColor:"lightblue",borderWidth:2,width:250,height:30,}}
            placeholder= "enter student id or book id" 
            onChangeText={(text)=>{this.setState({search:text})}}
            
             />
             <TouchableOpacity style={{backgroundColor:"green",width:100,height:30,alignItems:"center",justifyContent:"center",padding:5,marginLeft:10,borderWidth:2}}
             onPress={()=>{this.searchTransactions(this.state.search)}}
             >
               <Text>Search</Text>
             </TouchableOpacity>
            </View>

          <FlatList
            data={this.state.allTransactions}
            renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
            <Text>{"Book Id: " + item.bookId}</Text>
             <Text>{"Student id: " + item.studentId}</Text>
              <Text>{"Transaction Type: " + item.transactionType}</Text> 
              <Text>{"Date: " + item.date.toDate()} </Text>
              </View>
            )}

              keyExtractor={(item,index)=>index.toString()}
              onEndReached={this.fecthMoreTransactions}
              onEndReachedThreshold={0.7}
            >
          </FlatList>
       
          </View>

      );
    }
  }
