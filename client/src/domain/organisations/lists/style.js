import styled from 'styled-components';
import colors from 'components/styles/colors';

export const IconContainer = styled.div`
    position: absolute;
    top: 15px;
    left: 7px;
`;

export const SearchContainer = styled.div`
    position: relative;
    margin: 0 auto;
    border-bottom: 2px solid ${colors.gray};
    padding: 10px;

    &:active {
        border-bottom: 2px solid ${colors.primary};
    }

    &:hover {
        border-bottom: 2px solid ${colors.primary};
    }
`;

export const FormInput = styled.input`
    padding: 5px;
    padding-left: 30px;
    outline-color: ${colors.primary};
    outline: none;
    border: none;
    font-size: 18px;
    width: 100%;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`;

export const OptionsContainer = styled.div`
    position: absolute;
    top: 35px;
    z-index: 500;
    width: 100%;
`;


export const Styles = styled.div`

  .pagination {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }

  .pagination__rows {
    margin: 0 20px;
    display: flex;
    align-items: center;

    div {
      margin-right: 10px;
    }
  }

  .pagination__page {
    margin-right: 20px;
  }

  .pagination__controls {
    display: flex;
    width: 100px;
    justify-content: space-around;
  }
`;

export const ChevronButton = styled.button`
  background: transparent;
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
  border-radius: 50%;
  width: 35px;
  height: 35px;

  &:hover {
    color: ${colors.white};
    background: ${colors.primary};
  }
`;

export const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;