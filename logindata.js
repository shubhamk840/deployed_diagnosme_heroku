import mongoose from 'mongoose'

const loginData = mongoose.Schema({
    id:String,
    pass:String
});

export default mongoose.model('loginData',loginData);