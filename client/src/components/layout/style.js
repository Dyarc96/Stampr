import styled from 'styled-components';
import colors from 'components/styles/colors';

export const Background = styled.div`
    height: 100%;
    position: absolute;
    width: ${props => props.full ? '100%' : '40%'};
    z-index: ${props => props.full ? '-5' : '0'};
    background: ${props => props.primary ? colors.primary : colors.whitish};

    @media (max-width: 900px) {
        display: none;
    }
`;

export const Wrapper = styled.div`
    position: absolute;
    height: 85%;
    width: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background-color: #fafafa;
    background-color: ${colors.white};
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    font-family: Zwizz;

    @media (max-width: 1024px) {
        height: 100%;
        width: 100%;
        border-radius: none;
    };
`;

export const ContentWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1024px) {
        overflow: visible;
    };
`;

export const ChildrenWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 70%;
    margin: 0 auto;
    font-size: 18px;
    overflow-y: auto;

    @media screen and (max-width: 1024px) {
        width: 90%;
        padding-top: 40px;
        overflow-y: visible;
    };

    @media screen and (max-width: 420px) {
        padding-top: 20px;
        width: 90%;
    };
`;
