const mongoose = require('mongoose');
const Organization = mongoose.model('organization');
const User = mongoose.model('user');

module.exports = (app) => {

    // Get all organizations

    app.get('/api/organizations', async (req, res) => {
        try {
            const organizations = await Organization.find();
            res.send({organizations});
        } catch(err) {
            res.sendStatus(500).send({ message: 'Internal Server Error' });
        }
    });

    // Get specific organization

    app.get('/api/organizations/:organizationId', async (req, res) => {
        try {
            const organization = await Organization.findById(req.params.organizationId);
            await res.send(organization);
        } catch (err) {
            res.sendStatus(500).send({ message: 'Internal Server Error' });
        }
    });

    // Find Organization by name

    app.get('/api/organizations/find/:organizationName', async (req, res) => {
        const organization = await Organization.find({
            $text: {
                $search: `${req.params.organizationName}`,
                $caseSensitive: false
            }
        });
        try {
            await res.send(organization);
        } catch (err) {
            res.sendStatus(500).send({ message: 'Internal Server Error' });
        }
    });

    // Get organizations linked to user

    app.get('/api/organizations/user/:userId', async (req, res) => {
        try {
            const organizations = await Organization.find({
                linkedUsers: req.params.userId
            });
            res.send(organizations);
        } catch (err) {
            res.sendStatus(500).send('Internal Server Error');
        }
    });

    // Get organizations linked to provider

    app.get('/api/organizations/provider/:userId', async (req, res) => {
        const organizations = await Organization.find({
            "linkedProviders.id": req.params.userId 
        });
        try {
            res.send(organizations);
        } catch (err) {
            res.sendStatus(500).send('Internal Server Error');
        }
    });

    // Stamp User

    app.post('/api/organizations/stamp/:userId/:organizationId', async (req, res) => {
        try {
            const user = await Organization.update({
                _id: req.params.organizationId,
                "linkedUsers._id": req.params.userId
            }, {
                $inc: {
                    "linkedUsers.$.stamps": 1, 
                    "linkedUsers.$.visits": 1
                }
            })
            res.send({ user });
        } catch (err) {
            res.status(500).send('There was an error while linking user with organization');
        }
    });

    // link user to organization

    app.post('/api/organizations/link-user/:organizationId', async (req, res) => {

        const { userData } = await req.body;

        await Organization.updateOne(
            {_id: req.params.organizationId },
            {$push: {"linkedUsers": {
                _id: userData.id,
                stamps: 0,
                visits: 0,
                firstName: userData.firstName,
                lastName: userData.lastName
            }
            }}  
        );

        const user = await User.updateOne(
            { _id: userData.id },
            {$push: {"linkedOrganizations": req.params.organizationId}}
        )

        try {
            res.send({user})
        } catch (err) {
            res.status(500).send('There was an error while linking user with organization');
        }
    });

    // Request invitation by employee

    app.post('/api/organizations/request-employee/:organizationId', async (req, res) => {
        try {
            const { userData } = await req.body;
            const foundOrgs = await Organization.find({
                "candidateProviders._id": userData._id 
            });

            if(foundOrgs.length === 0) {
                const organization = await Organization.updateOne(
                    {_id: req.params.organizationId },
                    { $push: {"candidateProviders": {
                        _id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName
                    }
                    }}
                );
                res.send({organization});
            } else {
                res.status(409).send('Jesteś juz powiązany z tą organizacją.')
            }

        } catch (err) {
            res.status(500).send('There was an error while request employee invitation.')
        }
    })

    app.delete('/api/organizations/reject-employee/:organizationId/:userId', async (req, res) => {
        try {
            const organization = await Organization.update(
                {   _id: req.params.organizationId,
                }, {
                    $pull: {
                        "candidateProviders": {
                            _id: req.params.userId
                        }
                    }
                })
            res.send({organization});

        } catch (err) {
            res.status(500).send('There was an error while request employee invitation.')
        }
    });

    app.post('/api/organizations/accept-employee/:organizationId/:userId', async (req, res) => {
        const user = await req.body;
        try {

            const credentialObject = {
                _id: req.params.userId,
                firstName: user.userData.firstName,
                lastName: user.userData.lastName,
                isHead: false
            };

            await Organization.update(
                { _id: req.params.organizationId, 
                }, {
                    $pull: {
                        "candidateProviders": {
                            _id: req.params.userId
                        }
                    }
                }
            );
            await User.update(
                { _id: req.params.userId },
                { $push: {
                    linkedProviderOrganizations: req.params.organizationId
                }, $set: {
                    isProvider: true
                }
            }
            )
            await Organization.update(
                { _id: req.params.organizationId, 
                }, {
                    $push: {
                        linkedProviders: credentialObject
                    }
                }
            );
            res.send({credentialObject});
        } catch (err) {
            res.sendStatus(422).send(err);
        }
    })

    // create organization

    app.post('/api/organizations/create-organization', async (req, res) => {

        const { name, address, type, linkedProviders,
            numOfStamps, id } = await req.body;

        const organization = new Organization({
            name, address, type, linkedProviders, numOfStamps
        });

        await User.updateOne(
                {_id: id},
                { $push: {"linkedProviderOrganizations": organization.id}},
            )

        try {
            await organization.save();
            res.send({organization});
        } catch (err) {
            res.sendStatus(422).send(err);
        };
    });

    app.put('/api/organizations/update-organization', async (req, res) => {
        const {name, address, type, numOfStamps, id} = await req.body;

        try {
            await Organization.updateOne(
                {_id: id},
                {$set: {
                    name,
                    address: address,
                    type: type,
                    numOfStamps: numOfStamps,
                    }
                });
            const organization = await Organization.findById(id);
            res.send(organization);
        } catch (err) {
            res.sendStatus(500).send('Unexpected error');
        }
    })
}