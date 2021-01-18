// Provider is normal user but with isProvider set to true & linkedProviderOrganizations
// User becomes provider by filling out the form, therfore he can become provider & add organization
// Organization is added by search when it exists or created
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = (app) => {

    // User routes
    app.put('/api/users/update-profile/:userId', async (req, res) => {
        const { name, surname } = await req.body;

        try {
            await User.updateOne(
                { _id: req.params.userId },
                {$set: {
                    name,
                    surname
                }
            });
            const foundUser = await User.findById(req.params.userId)
            res.send(foundUser);
        } catch (err) {
            res.sendStatus(500).send('Internal Server Error');
        }
    });

    app.post('/api/users/become-partner/:userId', async(req, res) => {
        const { nip } = await req.body;

        try {
            await User.updateOne(
                { _id: req.params.userId },
                { $set: {
                    nip,
                    isProvider: true
                }}
            );
            const foundUser = await User.findById(req.params.userId);
            res.send(foundUser);
        } catch (err) {
            res.sendStatus(500).send("Can't create provider profile");
        }
    })

}