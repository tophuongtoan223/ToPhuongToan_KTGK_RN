import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const Jobs = () => {
    const [newJob,setNewJob] = useState("")
    const [joBs, setjoBs] = useState("")
    const cJoBs = firestore().collection("JOBS")
    const addNewJob = ()=>{
        cJoBs.add({
            title:newJob,
        })
        .then(()=>Alert.alert("Thêm dữ liệu"))
        .catch(e=>Alert.alert(e.message))
    }
    useEffect(()=>{
        cJoBs.onSnapshot(
            listJoBs=>{
                var result = []
                listJoBs.forEach(
                    job => {
                        const {title, complete} = job.data()
                        result.push({
                            id:job.id,
                            title,
                            complete
                        })
                    }
                )
                setjoBs(result)
            }
        )
    },[])
    const updateJob=({id, complete})=>{
        cJoBs.doc(id)
        .update({
            complete: !complete
        })
        .then(()=>Alert.alert("Đã cập nhật"))
    }
    const renderItem = ({item})=>{
        const {id,title,complete}=item
        return(
            <Button icon={(complete)? "home":"star"}
                onPress={()=>updateJob(item)}
            >
                {title}
            </Button>
        )
    }
    return (
    <View style={{flex:1}}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center', marginBottom: 30 }}>
      Home
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput 
        style={{width:300}}
        label="Job mới"
        value={newJob} 
        onChangeText={setNewJob} 
        /> 
        <Button
        mode="contained-tonal"
        onPress={addNewJob}
        >
            Thêm
        </Button>
      </View>
        <Appbar>
            <Appbar.Content title="Danh Sách Job"/>
        </Appbar>
        <FlatList
            data={joBs}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />

    </View>
    )
}

export default Jobs

const styles = StyleSheet.create({})