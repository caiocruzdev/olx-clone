import React from 'react';
import { PageArea} from "./styled";
import {PageContainer} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/aditem';


const Page= () =>{
    const api = useAPI();
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

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
                    <input type="text" name="q" placeholder="O que você precisa?"/>
                    <div className="filterName">Estado:</div>
                    <select name="state">
                        <option>Selecione o Estado</option>
                        {stateList.map((index, key)=>
                            <option key={key} value={index.name}>{index.name}</option>
                        )}

                    </select>
                    <div className="filterName">Categoria:</div>
                    <ul>
                            {categories.map((index, key)=>
                                <li key={key} className="categoryItem">
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