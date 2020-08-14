const app = require('./app');
const { PORT }= require('./config');

app.listen(PORT,()=>{
    console.log(`🎉 Connected @ http://localhost:${PORT} 🎉`);
})