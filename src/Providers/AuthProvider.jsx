import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [response, setResponse] = useState("");
    const [baskets, setBaskets] = useState([])
    return (
            <>  
                <AuthContext.Provider value={
                    { response, setResponse,
                      baskets, setBaskets}
                    }>
                    {children}
                </AuthContext.Provider>
            </>
    );
            
}

export default AuthProvider;