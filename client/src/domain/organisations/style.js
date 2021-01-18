import styled from 'styled-components';
import colors from 'components/styles/colors';
import { Link } from 'react-router-dom';

export const OrganizationsContainer = styled.div`
    display: flex;
    justify-items: center;
`;

export const Wrapper = styled.div`
    position: relative;
    overflow: scroll;
    height: calc(100% - 100px);
`;

export const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px;
`;

export const CardWrapper = styled.div`
    position: relative;
    display: flex;
    margin: 20px;
    width: 100%;
    max-width: 100%;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    background: ${colors.gray1};

    @media (max-width: 580px) {
        height: 400px;
        flex-direction: column;
    }
`;

export const StyledLink = styled(Link)`
    color: ${colors.white};
    text-decoration: none;
`;

export const PhotoContainer = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 5px;
    background: ${colors.white};
    // overflow: hidden;

    @media (max-width: 580px) {
        width: 100%;
        height: 250px;
    }
`;

export const Photo = styled.img`
    height: 200px;
    width: 100%;

    @media (max-width: 580px) {
        width: 100%;
        height: 250px;
    }
`;

export const InformationContainer = styled.div`
    padding: 0 20px;
`;

export const OrganizationType = styled.p`
    margin: 20px 0 0 0;
    font-size: 12px;
    color: gray;
    font-style: italic;
`;

export const OrganizationName = styled.h2`
    margin: 0 0 10px 0;
`;

export const OrganizationAddress = styled.p`
    margin: 0;
    font-family: Montserrat;
`;

export const Button = styled.button`
    position: absolute;
    border: 0;
    border-radius: 50px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: ${colors.white};
    font-size: 14px;
    padding: 12px 20px;
    bottom: 20px;
    right: 20px;
    letter-spacing: 1px;
    background-color: ${colors.primary};
    outline: none;
`;
