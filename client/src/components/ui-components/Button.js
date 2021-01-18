import styled from 'styled-components';
import colors from '../styles/colors';

export const Button = styled.div`
    border: 3px solid ${props => props.danger ? colors.danger :  colors.green};
    border-radius: 2px;
    width: ${props => props.width ? props.width : '80px'};
    padding: 8px 12px;
    background: ${colors.white};
    font-size: 16px;
    border-radius: 24px;
    text-align: center;
    color: ${props => props.danger ? colors.danger :  colors.green};
    transition: all 0.5s;
    white-space: nowrap;

    &:hover {
        background: ${props => props.danger ? colors.danger :  colors.green};
        transform: translateY(-5px);
        scale: 1.05;
        color: ${colors.white};
    }
`;

export const CloseButton = styled.button`
    width:40px;
    height:40px;
    background:transparent;
    border: 4px solid red;
    border-radius: 100%;
    outline: none;
    position:relative;
    cursor:pointer;
    display:inline-block;
    margin:10px 20px;

    &:after{
        width:24px;
        height:4px;
        background-color: red;
        content:"";
        left:50%;
        top:50%;
        margin-left:-12px;
        margin-top:-2px;
        position:absolute;
        transform: rotate(-45deg);
    }
    &:before{
        left:50%;
        top:50%;
        margin-left:-12px;
        margin-top:-2px;
        width:24px;
        height:4px;
        background-color: red;
        content:"";
        position:absolute;
        transform: rotate(45deg);
    }
`

export const ButtonBlue = styled.div`
    border-bottom: ${colors.primary} solid 2px;
    border-radius: 2px;
    padding: 12px 10px;
    width: 160px;
    font-size: 16px;
    background: ${colors.white};
    color: ${colors.primary};

    &:hover {
        background: ${colors.primary};
        color: ${colors.white};
    }
`

export const CancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.red};
    width: 40px;
    height: 40px;
    border-radius: 100%;
`