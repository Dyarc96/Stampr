import React, { useState, useEffect } from 'react';
import testLogo from 'assets/test-logo.png'
import img from 'assets/stamp-icon.png';
import { CardWrapper, CardContainer, Stamp, CardHeader, CardAddress,
    LastUpdate, StampsContainer, LogoContainer, Logo, StampImg } from './style';

const Card = (props) => {
    const [ user, setUser ] = useState(null);
    const { organization, userId } = props;

    useEffect(() => {
        if(organization) {
            setUser(organization.linkedUsers.find(
                user => user._id === userId, user));
        }
    }, [setUser, organization, userId, user])

    const renderStamps = () => {
        let stampsCount = user.stamps;
        return Array.from({length: props.organization.numOfStamps }, (item, index) => {
            if(stampsCount >= 0) {
                stampsCount--;
            }
            return (
                <Stamp key={index}>
                    {stampsCount >= 0 &&  <StampImg src={img}/>}
                </Stamp>)
            }
        );
    };

    return (
        <>
            {props.organization && 
                <CardWrapper>
                    <LogoContainer>
                        <Logo src={testLogo}></Logo>
                    </LogoContainer>
                    <StampsContainer>
                        {user && renderStamps()}
                    </StampsContainer>
                    <CardContainer>
                        <CardHeader>{props.organization.name}</CardHeader>
                        <LastUpdate>
                            Ostatnio odwiedzone
                        </LastUpdate>
                        <CardAddress>
                            {('ul. ' + props.organization.address[0].address1 
                            + ', ' + props.organization.address[0].city)}
                        </CardAddress>
                    </CardContainer>
                </CardWrapper>
            }
        </>)
};

export default Card;