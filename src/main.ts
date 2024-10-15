import { config } from "dotenv";

const main = async () => {
    config();
    const start = await import('./servers/app');
    await start.default();
}

main().catch(err => console.log('Error starting server', err));