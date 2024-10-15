import http from 'http';
import startExpressApp from './startExpressApp';
import connectDB from '../models/index';

const startServer = async () => {
    await connectDB(process.env.MONGO_URI as string);

    const app = await startExpressApp();

    const server = http.createServer(app);

    const port = process.env.PORT || 3500;
    
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default startServer;