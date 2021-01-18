import styled from 'styled-components';
import colors from '../styles/colors';

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const SearchBarContainer = styled.div`
    position: relative;
    width: 100%;
    background: rgba(44, 56, 105, 0.8);
    border-radius: 50px;
    padding: 15px;

    @media screen and (max-width: 600px) {
        width: unset;
    }
`;

export const FormInput = styled.input`
    padding: 5px;
    width: calc(100% - 35px);
    font-size: 18px;
    border: none;
    outline: none;
    padding-left: 35px;
    background: transparent;
    color: white;

    ::placeholder {
        color: white;
        opacity: 1; /* Firefox */
      }
`;

export const OptionsContainer = styled.div`
    position: absolute;
    top: 70px;
    padding: 15px;
    background: rgba(44, 56, 105, 0.8);
    border-radius: 25px;
    z-index: 500;
    width: 100%;
`;

export const OptionContainer = styled.div`
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 25px;
    color: ${colors.white};
    cursor: pointer;

    &:hover {
        background-color: ${colors.primaryLight};
    }
`;

export const Img = styled.img`
    height: 30px;
    width: 30px;
    position: absolute;
    left: 10px;
`;