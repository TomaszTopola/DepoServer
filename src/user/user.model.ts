import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import Permits from './permits.enum'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new Schema({
    _id: {type: String},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    mail: {type: String, required: true, lowercase: true, trim: true, unique: true},
    permits: [{type: String, enum: Permits, default: []}],
},
{
    collection: 'users',
    timestamps: true,
})

userSchema.plugin(passportLocalMongoose, {usernameField: '_id'})
const userModel = mongoose.model('User', userSchema)

export default userModel