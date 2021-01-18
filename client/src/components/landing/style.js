import styled from 'styled-components';

export const StyledH2 = styled.h2`
    font-size: 32px;
`;

export const StyledSubHeading = styled.p`
    font-size: 24px;
    margin: 5px 0;
    padding-left: 5px;
    line-height: 1.2;

    @media screen and (max-width: 580px) {
        font-size: 20px;
    }
`;

export const StyledTextContainer = styled.div`
    position: absolute;    
    top: 25%;
    width: 75%;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 580px) {
        top: 0;
        width: 100%;
    }
`;

export const StyledImg = styled.img`
    position: absolute;
    right: 0;
    bottom: 10%;
    max-width: 50%;

    @media screen and (max-width: 580px) {
        top: unset;
        bottom: 20%;
        max-width: 100%;
    }
`;