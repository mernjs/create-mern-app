const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    app_name: { type: String, required: true },
    client_id: { type: String, required: true },
    client_secret: { type: String, required: true },
    redirect_uri: { type: String, required: true },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true }
});

module.exports = mongoose.model('Application', applicationSchema);
