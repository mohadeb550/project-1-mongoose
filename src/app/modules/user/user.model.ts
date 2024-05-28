
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
// import bcrypt from 'bcrypt'


const userSchema = new Schema<TUser> ({
    id : {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required : true
    },
    needsPasswordChange : {
        type : Boolean,
    },
    role : {
        type : String,
        enum: {
            values: ['student', 'admin', 'faculty']
        }
    },
    status: {
        type : String,
        enum : ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted : {
        type : Boolean,
        default: false
    }
}, { timestamps: true })


// pre save middleware / hook : will work on create() /save()
userSchema.pre('save', async function (next){
    const user = this
    // user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  
    next()
  })
  
  userSchema.post('save', function(doc, next){
    doc.password = ''
    next()
  })
  
  



const User = model <TUser>('User', userSchema);
export default User;