import { connect } from 'mongoose';

const connectDB = async (url: string) => {
    return connect(
        url, { autoIndex: true}
    )
};

export default connectDB;