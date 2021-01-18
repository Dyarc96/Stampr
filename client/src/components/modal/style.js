import styled from 'styled-components';
import colors from 'components/styles/colors';

export const ModalContainer = styled.div`
    position: fixed;
    display: ${props => props.modalVisibility ? 'block' : 'none'};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const ModalBackground = styled.div`
    height: 100%;
    width: 100%;    
    opacity: 0.4;
    background: ${colors.black};
`;

export const ModalContent = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    width: 70%;
    height: 80%;
    background: ${colors.white};
    border-radius: 5px;
`;

export const ModalFooter = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 20%;
`;

export const ModalHeader = styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 0;
    width: 100%;
    height: 10%;
`;