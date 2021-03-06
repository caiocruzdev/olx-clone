import React from 'react';
import { PageArea} from "./styled";
import {PageContainer} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';
import { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/aditem';

let timer;
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
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [resultOpacity, setResultOpacity] = useState(1);
    const [warningMessage, setWarningMessage] = useState('Carregando...');
    const [loading, setLoading] = useState(true);

    const getAdsList = async ()=>{
        setLoading(true);
        let offset = ((currentPage-1) *9);
        const json = await api.getAds({
            sort: 'desc',
            limit:9,
            q,
            cat,
            state,
            offset

        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(()=>{
        if(adList.length > 0){
        setPageCount( Math.ceil( adsTotal / adList.length ));
        }else{
            setPageCount(0);
        }
    },[adsTotal])

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    },[currentPage])

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
        });
        
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1500);
        setResultOpacity(0.3);
        setCurrentPage(1); //selecionar pagina 1 a cada nova pesquisa

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

    let pagination = [];
    for(let i = 1; i<=pageCount; i++){
        pagination.push(i)
    }

    
    
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
                    <h2>Resultados</h2>
                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Nao encontramos resultados</div>
                    }
                    <div className="list" style={{opacity:resultOpacity}}>
                                {adList.map((index,key)=>
                                    <AdItem key={key} data={index}></AdItem>
                                )}
                    </div>

                    <div className="pagination">
                        {pagination.map((index, key)=>
                            <div onClick={()=>setCurrentPage(index)} className={index === currentPage ? 'pagItem active':'pagItem'}>{index}</div>
                        )}
                    </div>

                </div>
            </PageArea>
        </PageContainer>
    );
};

export default Page;