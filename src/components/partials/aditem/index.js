import React from 'react';
import {Item} from './styled';
import  {Link} from 'react-router-dom';

function AdItem(props){
    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável';
    }else{
        price = parseInt(props.data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });//Preco na moeda Brasileira
    }

    return(
        <Item className="AdItem">
            <Link to = {`/ad/${props.data.id}`}>
                <div className="ItemImage">
                    <img src={props.data.image} alt=""></img>
                </div>
                <div className="ItemName">
                    {props.data.title}
                </div>
                <div className="ItemPrice">{price}</div>
            </Link>
        </Item>
    );
}
export default AdItem;