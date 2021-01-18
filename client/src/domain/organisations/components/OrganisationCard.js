import React from 'react';

import hairdDresserImg from 'assets/images/hair-dresser.jpg';
import restaurantImg from 'assets/images/restaurant.jpg';
import spa from 'assets/images/spa.jpg';
import { CardWrapper, StyledLink, PhotoContainer, Photo, 
        InformationContainer, OrganizationType, OrganizationName,
        OrganizationAddress, Button } from '../style'

const OrganisationCard = ({ organization }) => {

    const renderOrganisationType = () => {
        switch(organization.type) {
            case 'Fryzjer':
                return 'Salon Fryzjerski';
            case 'Makijazystka':
                return 'Salon Makijazu';
            case 'Restauracja':
                return 'Restauracja';
            default:
                return
        }
    }
    
    return (
        <CardWrapper>
            <PhotoContainer>
                {organization.type === 'Fryzjer'
                    ? <Photo src={hairdDresserImg}/>
                    : organization.type === 'Makijazystka'
                        ? <Photo src={spa}/>
                        : <Photo src={restaurantImg}/>
                }
            </PhotoContainer>
            <InformationContainer>
                <OrganizationType>
                    {renderOrganisationType()}
                </OrganizationType>
                <OrganizationName>
                    {organization.name}
                </OrganizationName>
                <OrganizationAddress>
                    {organization.address[0].address1}
                </OrganizationAddress>
                <Button >
                    <StyledLink
                        to={{ pathname: `/organizations/${organization._id}` }}>
                        Zarządzaj
                    </StyledLink>
                </Button>
            </InformationContainer>
        </CardWrapper>
    )
};

export default OrganisationCard;