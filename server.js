const express 	= require('express');
const app 		= express();
const server 	= require('http').createServer(app);
const path 		= require('path');
let port 		= process.env.PORT || 3000;

server.listen(port, (server)=>{
	console.log('...listening on ', port);
}); 

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', (req, res, next)=>{
	res.sendFile(path.join(__dirname,'/index.html'));
});