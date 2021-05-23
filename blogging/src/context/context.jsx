import React , {useContext,useEffect,useState} from "react";
import url from "./../components/url/url"
import axios from 'axios'

const GlocbalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()
const UseGlobalState = () => useContext(GlocbalStateContext)
const UseGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)


function GlobalStateProvider( {children} ){
    const [data,  setData] = useState({
        role:null,
        blog:null
    })

    useEffect(()=>{
        axios({
            method: 'get',
            url: url + `/profile`,
            withCredentials : true
        })
        .then(function(response){
            if(response.data.status === 200){
            localStorage.setItem("profileImage", response.data.profile.imageurl)
            setData(prev=>({
            ...prev,
            user: response.data.profile,
            loginStatus:true,
            role: response.data.profile.role
            }))
        }
        })
        .catch(function (error) {
            // handle error
            // console.log("error: ==== ", error);
            if (error && error.response && error.response.status) {
                // console.log("error ==============> ", error.response.status);
                setData(prev => ({ ...prev, loginStatus: false }))
            }
        })

    return () => {
        // console.log("cleanup")
    }
}, [])

// console.log()

console.log(data);



return (

    <GlobalStateContext.Provider value={data}>
        <GlobalStateUpdateContext.Provider value={setData}>
            {children}
        </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>

)
}


export { UseGlobalState, UseGlobalStateUpdate, GlobalStateProvider }
