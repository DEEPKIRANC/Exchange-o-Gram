import React,{createContext,useState} from "react";

export const usercontext=createContext();



export function UserContext(props)
{
    const [user,setUser]=useState("");
    return <usercontext.Provider value={[user,setUser]}>
        {props.children}
    </usercontext.Provider>    

}
