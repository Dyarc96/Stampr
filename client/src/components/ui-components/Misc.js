import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
`;

export const Header = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  display: flex;

    @media screen and (max-width: 600px) {
        top: 50%;
    }
`;

export const PaddingBox = styled.div`
	padding: 20px;
	margin-top: 50px;
`;


export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;