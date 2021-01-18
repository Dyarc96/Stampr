import React from 'react';
import appPhoto from 'assets/images/undraw_my_app.svg';
import { StyledH2, StyledSubHeading,
    StyledTextContainer, StyledImg } from './style';
import { Header } from 'components/ui-components/Misc';

const Landing = ({user}) => {

    return (
            <Header>
                <StyledTextContainer>
                    {(user && user._id)
                        ?
                        <>
                            <StyledH2>Cześć {user.name}</StyledH2>
                            <StyledSubHeading>
                                Witaj na Stampr.
                            </StyledSubHeading>
                            <StyledSubHeading>
                                Zbieraj pieczątki i wymieniaj je na promocje lub dodaj własny lokal i rozdawaj pieczątki.
                            </StyledSubHeading>
                            <StyledSubHeading>
                                To takie proste!
                            </StyledSubHeading>
                        </>
                        :
                        <StyledSubHeading>
                            Załóż konto i ciesz się prostotą 
                            zdobywania pieczątek
                        </StyledSubHeading>}
                </StyledTextContainer>
                <StyledImg src={appPhoto}>
                </StyledImg>
            </Header>
    )
};

export default Landing;