import mongoose from 'mongoose';

const DMCAPolicySchema = new mongoose.Schema({
    policyText: String,
    id : Number
});

export default model("DMCAPolicy", DMCAPolicySchema);