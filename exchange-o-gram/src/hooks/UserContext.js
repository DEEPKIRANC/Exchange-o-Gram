import React,{createContext,useState} from "react";

export const usercontext=createContext();



export function UserContext(props)
{
    const [user,setUser]=useState("");
    // passing user and setUser to Provider for consumption i.e global memory
    return <usercontext.Provider value={[user,setUser]}>    
        {props.children}
    </usercontext.Provider>    

}
