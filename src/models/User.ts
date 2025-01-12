import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address format',
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true
            //getters: true ONLY UNCOMMENT IF WE NEED IT ON A GET PARAMETER LATER
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

const User = model('user', userSchema);

export default User;