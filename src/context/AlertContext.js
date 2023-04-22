import React , { useState } from "react";
export const ShowAlertContext = React.createContext();

function AlertContext({children}){
    const [openAlert, setOpenAlert ] = useState(null)
    return (
        <ShowAlertContext.Provider value={[openAlert, setOpenAlert ]}>{children}</ShowAlertContext.Provider>
    );
}

export default AlertContext;