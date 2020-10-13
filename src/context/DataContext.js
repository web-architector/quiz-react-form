import React, { createContext, useContext, useState } from 'react';


const DataContext = createContext();

function DataProvider({children}) {
    const [data, setData] = useState({});

    const setValues = (values) => {
        setData((prevState) => ({
            ...prevState,
            ...values,
        }));
    };
    const resetState = ()=>{
        setData({})
    }
    return (
        <DataContext.Provider value={{data, setValues, resetState} }>
            { children }
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
export { DataProvider };
