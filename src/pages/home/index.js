import React from 'react';
import { PageArea, SearchArea } from "./styled";
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

        <>
        <SearchArea>
            <PageContainer>
                <div className="searchBox">
                    <form method="GET" action="/ads">
                        <input type="text" name="q" placeholder="o que você procura?"></input>
                        <select name="state">
                        <option selected="Estado">Estado</option>
                                {stateList.map((index, key)=>
                                <option key={key} value={index.name}>{index.name}</option>
                                )}
                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className="categoryList">
                    {categories.map((index, key)=>
                    <Link to={`/ads?cat=${index.slug}`} className="categoryItem" key={key}>
                        <img src={index.img} alt=""></img>
                        <span>{index.name}</span>
                    </Link>
                    )}
                </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className="List">
                        {adList.map((index, key)=>
                            <AdItem key={key} data={index}> </AdItem>
                        )}
                </div>
                <Link to="/ads" className="seeAllLink">Ver Todos</Link>
                <hr></hr>
                <div>jbdihcbubgudbjc</div>
            </PageArea>
        </PageContainer>

        </>
        
    );
};

export default Page;