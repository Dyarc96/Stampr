import styled from 'styled-components';
import colors from 'components/styles/colors';
import utils from 'components/styles/utils';

export const CardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    box-shadow: ${utils.primaryBoxShadow};
    margin: 20px;
    width: 250px;
    height: 400px;
    background: ${colors.white};
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
    backface-visibility: hidden;

    &:hover {
        transform: scale(1.1);
    }
`;

export const Stamp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: ${colors.gray};
    border: 1px solid ${colors.black};
    height: 33px;
    width: 33px;
    margin: 10px;

    @media screen and (max-width: 600px) {
        width: 33px;
        height: 33px;
        margin: 7px;
    }
`;

export const CardHeader = styled.h2`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 7px;
    font-size: 17px;
`;

export const CardAddress = styled.h2`
    position: absolute;
    bottom: 0;
    right: 7px;
    font-size: 15px;
    text-align: right;
`;

export const LastUpdate = styled.p`
    position: absolute;
    top: 40px;
    margin: 0;
    font-size: 12px;
    color: ${colors.darkgray};
    text-transform: uppercase;
`;

export const StampsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    width: 100%;
`;

export const Logo = styled.img`
    width: 200px;
    height: 150px;
`;

export const StampImg = styled.img`
    width: 25px;
    height: 25px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

export const CardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow-y: auto;
    padding-top: 50px;
    height: 450px;
    width: 100%;
`;

export const ColumnFlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
`;
