import React from "react";
import { Route, Routes } from 'react-router-dom'
import { ROUTE_PATH_LIST } from '../Constant'

function RouteList(){
    return(
        <>
            <Routes>
                {Object.values(ROUTE_PATH_LIST).map(el =>{
                    <Route exact key={el.path} path={el.path} element={el.component} />
                })}
                
            </Routes>
        </>
    );
}


export default RouteList;