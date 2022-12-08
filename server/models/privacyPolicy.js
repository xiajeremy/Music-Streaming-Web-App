import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema({
    policyText: String,
    id : Number
});

export default model("PrivacyPolicy", PrivacyPolicySchema);