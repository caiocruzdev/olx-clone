import styled from 'styled-components';

export const HeaderArea = styled.div`
    background-color: #FFF; 
    height:60px;
    border-bottom: 1px solid #CCC;
.container{
    max-width: 1200px;
    margin:auto;
    display:flex;
    height: 60px;
    a{
        text-decoration:none;
    }
}
.padrao{
    font-weight:normal;
}
.logo{
    flex:1px;
    display:flex;
    align-items:center;

    .logo-1,
    .logo-2,
    .logo-3{
        font-size:33px;
        font-weight:bolder;
    }
    .logo-1{color: #9400D3;}
    .logo-2{color: #00ff00;}
    .logo-3{color: 	#FF8C00;}
}
nav{
    padding-top:10px;
    padding-bottom:10px;

    ul, li{
        margin:0;
        padding: 0;
        list-style: none;
    }
    ul{
        display:flex;
        align-items:center;
        height: 40px;
    }
    li{
        margin-left:15px;
        margin-right:15px;
        color:#FF0000;
        a, button{
            
            font-weight: bold;
            border:0;
            background:none;
            color:#000;
            font-size:14px;
            text-decoration:none;
            cursor:pointer;
            outline:0;
            
            &:hover{
                color:#808080;
            }
            &.button{
            color: #FFFFFF;
            border-radius: 50px;
            background-color: #FF8100;
            padding:8px 18px;
            }
            &.button:hover{
                background-color: #EE7506;
            }
        }
    }
}


`;