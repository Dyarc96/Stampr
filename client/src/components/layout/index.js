import React from 'react';
import { Normalize } from 'styled-normalize';

import Navigation from 'components/navigation';
import GlobalFonts from 'assets/fonts/fonts';
import { Background, Wrapper, ContentWrapper, ChildrenWrapper } from './style';

const Layout = (props) => {
    const { user, children } = props;

    return (
        <>
            <Normalize/>
            <Background primary/>
            <Background full/>
            <Wrapper>
                <GlobalFonts/>
                    <ContentWrapper>
                        {user && 
                        <Navigation user={props.user}/> }
                            <ChildrenWrapper>
                                {children}
                            </ChildrenWrapper>
                    </ContentWrapper>
            </Wrapper>
        </>
    )
};

export default Layout;