import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from 'actions';

const Cards = lazy(() => import('domain/cards'));
const Settings = lazy(() => import('domain/settings'));
const AddOrganisation = lazy(() => import('domain/organisations/components/AddOrganisation'));
const EditOrganisation = lazy(() => import('domain/organisations/components/EditOrganisation'));
const ManageOrganization = lazy(() => import('domain/organisations/components/ManageOrganisation'));
const PartnerForm = lazy(() => import('domain/settings/PartnerForm'));
const Organisations = lazy(() => import('domain/organisations'));

const Landing = lazy(() => import('components/landing'));
const Layout = lazy(() => import('components/layout'));

const App = (props) => {
    const { fetchUser, user } = props;

    useEffect(() => {
        fetchUser();
    }, [fetchUser])

    return (
        <Suspense fallback={<div>Loading</div>}>
            <BrowserRouter>
                <Layout user={user}>
                    {user && 
                    <Switch>
                        <Route exact path="/settings" render={() => 
                            <Settings user={user}/>
                        }/>
                        <Route exact path="/stamps" render={() =>
                            <Cards user={user} />
                        }/>
                        <Route exact path="/account" render={() => 
                            <Settings user={user}/>
                        }/>
                        <Route exact path="/become-partner" render={() =>
                            <PartnerForm user={user}/>
                        }/>
                        <Route exact path="/organizations" render={() =>
                            <Organisations user={user}/>
                        }/>
                        <Route exact path="/organizations/add" render={(props) =>
                            <AddOrganisation {...props} user={user}/>
                        }/>
                        <Route exact path="/organizations/:id" render={(props) =>
                            <ManageOrganization {...props} user={user}/>
                        }/>
                        <Route exact path="/organizations/:id/edit" render={() =>
                            <EditOrganisation/>
                        }/>
                        <Route exact path="/" render={() => 
                            <Landing user={user}/>
                        }/>
                    </Switch>}
                    </Layout>
                </BrowserRouter>
            </Suspense>
        )
};

const mapStateToProps = ({user}) => {
    return user;
}

export default connect(mapStateToProps, actions)(App);
