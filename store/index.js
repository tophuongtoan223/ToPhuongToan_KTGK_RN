import { Children, createContext, useContext, useMemo, useReducer } from "react";
import firestore from '@react-native-firebase/firestore'
import  auth  from "@react-native-firebase/auth";
import { Alert } from "react-native";
const MyContext = createContext()

MyContext.displayName ="My store"
const reducer = (stade, action) => {
    switch (action.type)
    {
        case "USE_LOGIN":
            return {...stade, userLogin: action.value}
        case "LOGOUT":
            return {...stade, userLogin: null}
            default :{
                throw new Error("Action khong ton tai")
            }
    }
}
//myconText
const MycontextControllerProvider = ({children}) => {
    const initalState= {
        userLogin: null,
        jobs:[]
    }
    const [controler, dispath] = useReducer (reducer, initalState)
    const value = useMemo(() => [controler, dispath]) ([controler, dispath])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const UseMyContextProvider = () =>{
    const context = useContext(MyContext)
    if(!context)
    {
        return new Error("UseMyContextProvider phai dat trong MyContextControllerProvider")
    }
    return context
}
//tham chieu colec
const USERS = firestore().collection("USERS")
//Dinh nghia action
const createAccount = (email, password, fullName) =>{
    auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
        Alert.alert("Tao tai khoan thanh cong voi email:"+ email)
        USERS.doc(email)
        .set(
            {
                email,
                password,
                fullName,
            }
        )
    })
    .catch(e => console.log(e.message))
}
const login = (dispath, email, password, fullName) => {
    auth().sighInWithEmailAndPassword(email, password)
    .then(() =>{
        USERS.doc(email)
        .onSnapshot(u => {
            if(u.exists)
            {
                console.log("Dang nhap thanh cong voi :" + u.id )
                dispath({type: "USER_LOGIN", value: u.data()})
            }
        })
    })
    .catch(e =>Alert.alert("Vui long kiem tra lai Email hoac Password"))
}
const logout = (dispath) => {
    auth().sighOut()
    .then(() => dispath({type:"LOGOUT"}))
}

export{
    MycontextControllerProvider,
    UseMyContextProvider,
    createAccount,
    login,
    logout,
}