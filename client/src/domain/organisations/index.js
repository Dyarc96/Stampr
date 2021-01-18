import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OrganisationCard from './components/OrganisationCard';
import * as actions from 'actions';
import { Button } from 'components/ui-components/Button';
import { StyledLink } from 'components/ui-components/Misc';
import { ButtonContainer, Wrapper, OrganizationsContainer } from './style';

const Organisations = (props) => {

    const { getProviderOrganizations, organizations, user} = props;

    useEffect(() => {
        getProviderOrganizations(user._id);
    }, [ getProviderOrganizations, user ]);

    const renderOrganizationCards = () => {
        return organizations.map((organization, index) => 
            <OrganizationsContainer key={index}>
                <OrganisationCard id={index}
                    organization={organization}/>
            </OrganizationsContainer>
        )
    }

    return (
        <Wrapper>
            {organizations && renderOrganizationCards()}
            <ButtonContainer>
                <Button width="120px">
                    <StyledLink to='/organizations/add'>
                        Dodaj Lokal
                    </StyledLink>
                    </Button>
            </ButtonContainer>
        </Wrapper>
    )
}

const mapStateToProps = ({ organization }) => {
    return organization;
}

export default connect(mapStateToProps, actions)(Organisations);