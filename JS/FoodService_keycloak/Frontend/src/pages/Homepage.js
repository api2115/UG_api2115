import React, {useState,useEffect} from 'react';
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import {Link} from "react-router-dom";

const Home = () => {

    const { keycloak } = useKeycloak();
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            await axios.get('http://localhost:3000/test/restaurants',{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${keycloak.token}`
                    }
            }).then((res)=>setData(res.data)).catch((err)=>console.log(err))
        }


        if(keycloak.token!==undefined) {
            getData()
        }else{
             keycloak.token=1
            getData()
        }

    },[keycloak.token])


    return (
        <div>
            <h1>List</h1>
            {data.length>0?data.map(item=>{
                return(
                    <div key={item.id}>
                        <Link to={"/restaurant/"+item.id}><div>
                            <div>{item.name}</div>
                        </div></Link>
                    </div>
                )
            }):<div>loading</div>}

        </div>
    );
};

export default Home;