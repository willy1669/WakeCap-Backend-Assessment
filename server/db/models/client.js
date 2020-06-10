import mongoose from 'mongoose';
import clientSchema from '../schemas/clientSchema';

// CLIENT MODEL
const Client = mongoose.model('Twit', clientSchema);

export default Client;
