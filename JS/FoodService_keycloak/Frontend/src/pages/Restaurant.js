import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";

const Restaurant = () => {
    let {id} = useParams()
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

    function handleAddToBasket(e){
        const obj = data[id-1].menu.find(o=>o.name===e.target.value)
        obj.client=keycloak.tokenParsed.preferred_username
        console.log(obj)
        axios.post('http://localhost:3000/test/basket',obj,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`
            }
        }).then((res)=>console.log(res)).catch((err)=>console.log(err))
    }

    return (
        <div>
            <h1>Welcome to {data.length>0?data[id-1].name:<div>loadnig</div>}</h1>
            {data.length>0?data[id-1].menu?data[id-1].menu.map(item=>{
                return(
                    <div key={item.name}>
                        <div>{"Item name:"+item.name+" price:"+item.price+"zl"}</div>
                        {keycloak.authenticated?<button value={item.name} onClick={handleAddToBasket}>Add to basket</button>:<button>Log in to add to basket</button>}
                    </div>
                )
            }):<div>loading</div>:<div>menu is empty</div>}
        </div>
    );
};

export default Restaurant;