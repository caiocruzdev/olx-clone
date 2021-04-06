import React from 'react';
import { PageArea} from "./styled";
import {PageContainer} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';
import { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/aditem';


const Page= () =>{
    const api = useAPI();
    const history = useHistory();
    
    const useQueryString = ()=>{
        return new URLSearchParams(useLocation().search);
    };
    const query = useQueryString();
    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : ''); //verifica se o valor de query.get('q') é nulo, se nao for nulo ele pega o valor query.get('q') caso contrario ele assume o valor de ' ';
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '' );
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(()=>{
        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cat=${cat}`)
        }
        if(state){
            queryString.push(`state=${state}`)
        }
        history.replace({
            search:`?${queryString.join('&')}` //trocar a url sem atualizar a pagina
        })
    },[q, cat, state])

    useEffect( () => {
        const getStates = async ()=>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect( () => {
        const getCategories= async ()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect( ()=>{
        const getRecentAds = async () =>{
            const json = await api.getAds({
                sort: 'desc',
                limit:8

            });
            setAdList(json.ads);
           
        }
        getRecentAds();
    }, []);
    
    
    return(
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET"></form>
                    <input type="text" 
                    name="q" 
                    placeholder="O que você precisa?"
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    />
                    <div className="filterName">Estado:</div>
                    <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                        <option>Selecione o Estado</option>
                        {stateList.map((index, key)=>
                            <option key={key} value={index.name}>{index.name}</option>
                        )}

                    </select>
                    <div className="filterName">Categoria:</div>
                    <ul>
                            {categories.map((index, key)=>
                                <li key={key} 
                                className={cat==index.slug?'categoryItem active':'categoryItem'}
                                onClick={()=>setCat(index.slug)}
                                >
                                    <img src={index.img}  alt=""></img>
                                    <span>{index.name}</span>
                                </li>
                            )}
                    </ul>
                </div>
                <div className="rightSide">
                    ...
                </div>
            </PageArea>
        </PageContainer>
    );
};

export default Page;