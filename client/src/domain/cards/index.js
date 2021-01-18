import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import SearchBar from 'components/SearchBar';
import * as actions from 'actions/index';
import searchIcon from 'assets/search.png'
import { Button } from 'components/ui-components/Button';
import { SearchContainer, SearchBarContainer,
    Img, FormInput,
 } from 'components/ui-components/SearchbarComponents'; 
import { FlexWrapper, CardContainer, ColumnFlexWrapper } from './style.js';

const Cards = (props) => {
    const [ search, displaySearch ] = useState(false);
    const [ query, setQuery ] = useState('');
    const { user, fetchOrganizationData } = props;

    useEffect(() => {
        if(user.linkedOrganizations.length > 0) {
            const organizations = user.linkedOrganizations;
            organizations.forEach(organization => 
                fetchOrganizationData(organization));
        }
    }, [fetchOrganizationData, user])

    const handleSearchShow = () => {
        if(search) {
            displaySearch(false)
        } else {
            displaySearch(true)
        }
    }

    const renderCards = () => {
        if(props.organizations && user.linkedOrganizations.length > 0) {
            const organizations = props.organizations;
            if(query.length === 0) {
                return organizations.map((organization, index) =>
                    <Card key={index} userId={user._id}
                        organization={organization}/>)
            } else {
                return organizations.map((organization, index) => {
                    if(organization.name.toLowerCase().startsWith(
                        query.toLowerCase()
                    )) {
                        return <Card key={index} userId={user._id}
                        organization={organization}>
                    </Card>;
                    } else {
                        return null;
                    }
                })
            }
        }
    }

    return (
        <>
            <FlexWrapper>
                <div>Twoje karty</div>
                <Button onClick={handleSearchShow} danger={search}
                    width={search ? '80px' : '120px'}>
                    {search ? 'Anuluj' : 'Dodaj Lokal'}
                </Button>
            </FlexWrapper>
            <ColumnFlexWrapper>
            {search 
                ?  <SearchBar user={user}
                        findOrg={search ? true : false}
                        message={search ? 'Znajdź Organizacje' : 'Znajdź Kartę'}
                    />
                :
                    <SearchContainer>
                        <SearchBarContainer>
                            <Img src={searchIcon}/>
                            <FormInput placeholder='Znajdź kartę'
                                onInput={(e) => setQuery(e.target.value)}/>
                        </SearchBarContainer>
                    </SearchContainer>
                }
                <CardContainer>
                    { renderCards() }
                </CardContainer>
            </ColumnFlexWrapper>
        </>
    )
};

const mapStateToProps = ({organization}) => {
    return organization;
}

export default connect(mapStateToProps, actions)(Cards);