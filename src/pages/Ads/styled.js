import styled from 'styled-components';

export const PageArea = styled.div `
    display: flex;
    margin-top: 20px;
    .leftSide {
        width: 250px;
        margin-right: 10px;
        padding-right: 20px;
        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }
        input,
        select {
            width: 100%;
            height: 40px;
            background: white;
            border: 2px solid #9BB83C;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: black;
            padding: 5px;
        }
        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .categoryItem {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: black;
            cursor: pointer;
            transition: 0.2s all;
            &:hover,
            &.active {
                background-color: #9BB83C;
                color: white;
            }
            img {
                width: 38px;
                height: 38px;
                margin-right: 5px;
            }
            span {
                font-size: 14px;
            }
        }
        .categoryItem:hover,
        .categoryItem.active{
                background-color:#9BB83C;
                color:#fff;
        }
    }
.rightSide{
    flex:1;

    h2{
        margin-top:0;
        font-size:18px;
    }
    .listWarning{
        padding:30px;
        text-align:center;
    }

    .list{
        display:flex;
        flex-wrap:wrap;

        .AdItem{
            width:33%;
        }
    }
}
`;