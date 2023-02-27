import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";


const Secured = () => {

    const { keycloak } = useKeycloak();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [refresh,setRefresh] = useState(false)

    useEffect(()=>{
        const getData = async () => {
            await axios.get('http://localhost:3000/test/basket',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                }
            }).then((res)=>setData(res.data)).catch((err)=>console.log(err))
        }


        if(keycloak.token!==undefined) {
            getData()
        }

    },[keycloak.token,refresh])

    useEffect(()=>{
        var lista = []
        if(data.length>0){
            data.map(item=>{
                if(item.client===keycloak.tokenParsed.preferred_username){
                    lista.push(parseInt(item.price))
                }
            })
        }
        setTotal(lista.reduce((a, b) => a + b, 0))
    },[data])

    function handleOrder(){
        axios.delete('http://localhost:3000/test/basket/'+keycloak.tokenParsed.preferred_username,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`
            }
        }).then((res)=>setData(res.data)).catch((err)=>console.log(err))
        window.alert("items ordered")
    }

    function handleDelete(e){
        const idx =data.findIndex(el=>el.client===keycloak.tokenParsed.preferred_username && el.name===e.target.value)
        axios.delete('http://localhost:3000/test/basket/'+keycloak.tokenParsed.preferred_username+"/"+idx,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`
            }
        }).then((res)=>setData(res.data)).catch((err)=>console.log(err))
        setRefresh(!refresh)
    }

    return (
        <div>
            <h1>Basket</h1>
            {data.length>0?data.map(item=>{
                return(
                    <div key={item.name+Math.random()}>
                        <div>
                            {item.client===keycloak.tokenParsed.preferred_username?"basket item:"+item.name+" price:"+item.price:null}
                            {item.client===keycloak.tokenParsed.preferred_username?<button value={item.name} onClick={handleDelete}>delete</button>:null}
                        </div>
                    </div>

                )
            }):<div>empty basket</div>}
            <div>total price:{total}</div>
            <button onClick={handleOrder}>order</button>
        </div>
    );
};

export default Secured;