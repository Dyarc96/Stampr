import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.png';
import { NavList, NavListItem, NavListLink, LogoContainer,
    Logo, StyledLink, Button, ButtonContainer, FlexWrapper,
    HamburgerContainer, Hamburger } from './style';

const Navigation = (props) => {
    const [innerWidth, setWidth] = useState(window.innerWidth);
    const [menuDropDown, setDropDown] = useState(false);
    const { user } = props;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderButton = (strategy) => {
        if(strategy === 'google') {
            return (
                <Button google>
                    <i className="fab fa-google fa-2x"></i>
                    {(user && user.googleId) ? 'Wyloguj się' : 'Zaloguj się'}
                </Button>
            )
        } else {
            return (
                <Button facebook >
                    <i className="fab fa-facebook fa-2x"></i>
                    {(user && user.facebookId) ? 'Wyloguj się' : 'Zaloguj się'}
                </Button>
            )
        }
    }

    const openDropDown = () => {
        if(!menuDropDown) {
            setDropDown(true);
        } else {
            setDropDown(false);
        }
    }

    return(
        <nav>
            <NavList>
                <LogoContainer>
                    <Link to="/">
                        <Logo src={logo}></Logo>
                    </Link>
                </LogoContainer>
                <FlexWrapper opened={menuDropDown}>
                {user && user.isProvider === 'true' && 
                    <StyledLink to="/organizations">
                        <NavListItem>
                            TWOJE ORGANIZACJE
                        </NavListItem>
                    </StyledLink>}
                {user._id && 
                    <>
                        <StyledLink to="/account">
                            <NavListItem>
                                TWOJE KONTO
                            </NavListItem>
                        </StyledLink>
                        <StyledLink to="/stamps">
                            <NavListItem>
                                PIECZĄTKI
                            </NavListItem>
                        </StyledLink>
                    </>
                } 
                <ButtonContainer>
                    <NavListLink href="/auth/google">
                        {renderButton('google')}
                    </NavListLink>
                    <NavListLink href="/auth/facebook">
                        {renderButton('facebook')}
                    </NavListLink>
                </ButtonContainer>
                </FlexWrapper>
                {innerWidth < 1024 ? 
                    <HamburgerContainer 
                        onClick={openDropDown} 
                        opened={menuDropDown}>
                            <Hamburger opened={menuDropDown}/>
                    </HamburgerContainer> : null}
            </NavList>
        </nav>
    )
};

export default Navigation;