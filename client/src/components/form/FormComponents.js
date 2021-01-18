import styled from 'styled-components';
import colors from 'components/styles/colors';

export const FormField = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 2px 5px;
    padding-bottom: 22px;
`;

export const FormRadiosContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const FormRadioContainer = styled.div`
    display: flex;
    width: 20%;
    justify-content: space-around;
`;

export const FormLabel = styled.div`
    margin-bottom: 5px;
`;

export const FormInput = styled.input`
    padding: 5px;
    outline-color: ${colors.primary};
    border: 1px solid;
    border-color: ${props => props.danger ? colors.danger: colors.black};
    border-radius: 3px;
    font-size: 18px;
`;

export const FormContainer = styled.div`
    height: calc(100% - 180px);    
    overflow: auto;
`;

export const FormSelect = styled.select`
    padding: 5px;
    outline-color: ${colors.primary};
    font-size: 18px;
`;

export const FormOption = styled.option`
    padding: 5px;
    font-size: 18px;
`;

export const FormError = styled.p`
    position: absolute;
    bottom: -12px;
    right: 0;
    padding: 0;
    margin: 10px 0;
    font-size: 15px;
    color: darkred;
`