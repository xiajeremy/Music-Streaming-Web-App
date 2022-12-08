import mongoose from 'mongoose';

const AUPSchema = new mongoose.Schema({
    policyText: String,
    id : Number
});

export default model("AUP", AUPSchema);