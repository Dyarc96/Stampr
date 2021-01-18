import styled from 'styled-components';
import colors from '../styles/colors';

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    border-bottom: 1px solid ${colors.black};
    width: 90%;
    height: 50px;
`;

export const DataWrapper = styled.div`
    padding: 20px;
`;
export const TextItem = styled.p`
    margin: 0;
`;

export const TextHeader = styled.p`
    margin: 0;
    font-size: 20px;
`;