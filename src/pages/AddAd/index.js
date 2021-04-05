import React, {useState, useRef, useEffect} from 'react';
import { PageArea } from "./styled";
import {PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';
import MaskedInput from "react-text-mask";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


const Page= () =>{
    const api = useAPI();
    const fileField = useRef();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, SetPriceNegoatiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState([]);
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState();

    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories();
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true);

      /*  const json = await api.login(email, password);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword);
            window.location.href = '/';

        }*/
        setDisabled(false);
    };

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','

});

    return(
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input type="text" 
                            disabled={disabled} 
                            value={title} 
                            onChange={ e => setTitle(e.target.value)}
                            required></input>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select 
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >
                                <option>Escolha uma categoria</option>
                                {categories && categories.map(i=>
                                    <option key= {i._id} value={i._id}>{i.name}</option>
                                    )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$"
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociavel?</div>
                            <input type="checkbox"
                            disabled={disabled}
                            checked={priceNegotiable}
                            onChange={e=>SetPriceNegoatiable(!priceNegotiable)}
                            ></input>
                        
                    </label> 
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onchange={e=>setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Imagens</div>
                            <input
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar anuncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
};

export default Page;