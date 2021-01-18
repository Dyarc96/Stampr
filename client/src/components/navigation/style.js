import styled from 'styled-components';
import colors from 'components/styles/colors';
import { Link } from 'react-router-dom';

export const NavList = styled.div`
    display: flex;
    width: 100%;
    list-style: none;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

    @media (max-width: 1024px) {
        background-color: ${colors.primary};
        margin-top: -1px;
    }
`;

export const NavListItem = styled.div`
    padding: 0 15px;
    color: ${colors.primary};
    text-decoration: none;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    // background-color: #fafafa;
    background-color: ${colors.white};

    @media (max-width: 1024px) {
        color: ${colors.white};
        background-color: ${colors.primary};
    }
`;

export const NavListLink = styled.a`
    text-decoration: none;
    color: ${colors.primary};
    margin: 0;

    @media screen and (max-width: 1024px) {
        color: ${colors.white};
    }
`;

export const LogoContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;

    @media screen and (max-width: 1024px) {
        top: 5px;
        left: 5px;
    }
`;

export const Logo = styled.img`
    width: 100px;
    height: 100px;

    @media screen and (max-width: 1024px) {
        width: 50px;
        height: 50px;
    }
`;

export const StyledLink = styled(Link)`
  color: ${colors.black};
  text-decoration: none;

  @media screen and (max-width: 1024px) {
    color: ${colors.white};
    }
`;

export const Button = styled.button`
    position: realtive;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 120px;
    height: 40px;
    background-color: ${props => props.google ? '#de5246' : '#3b5998'};
    border-radius: 2px;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    cursor: pointer;
`;

export const ButtonContainer = styled.div`
    width: 260px;
    display: flex;
    justify-content: space-around;
`;

export const FlexWrapper = styled.div`
    width: 100%;
    display: none;
    align-items: center;
    justify-content: flex-end;
    display: flex;

    @media screen and (max-width: 760px) {
        position: absolute;
        top: 50px;
        z-index: 1;
        display: ${props => props.opened ? 'flex' : 'none'};
        flex-direction: column;
        justify-content: space-around;
        height: ${props => props.opened ? '140px' : '0px'};
        background-color: ${colors.primary};
    }
`;

export const HamburgerContainer = styled.div`
    display: none;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    justify-content: center;
    position: absolute;

    @media screen and (max-width: 760px) {
        display: block;
    }
`;

export const Hamburger = styled.div`
    width: 40px;
    height: 1.5px;
    background: ${props => props.opened ? 'transparent' : colors.white};
    position: relative;
    top: 50%;

    &:before,
    &:after {
        position: absolute;
        content: '';
        width: 40px;
        height: 2px;
        transition: all .3s ease-in-out;
        background: ${colors.white};
    }

    &:before {
        top: ${props => props.opened ? '0' : '10px'};
        transform: ${props => props.opened ? 'rotate(45deg)' : 'none'};
        max-height: 1.5px;
    }

    &:after {
        top: ${props => props.opened ? '0' : '-10px'};
        transform: ${props => props.opened ? 'rotate(-45deg)' : 'none'};
        max-height: 1.5px;
    }
`
