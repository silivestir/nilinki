
/*
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const path=require('path')
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(path.join(__dirname, 'views')));
io.on("connection", socket => {
  console.log("User connected");

  socket.on("code change", code => {
    io.sockets.emit("code change", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


// Define routes
const routes = ['/index.html', '/class.html', '/uploxads/vijxewer','/mybooks', '/upload', '/login', '/signup', '/admin', '/homes'];

routes.forEach(route => {
  
  app.get(route, (req, res) => {
    console.log("render")
 //   res.sendFile("/uploads/viewer.html")
   res.redirect(route.slice(1), { files: [] }); // Render corresponding EJS template with an empty files array
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
*/

/*

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'));
app.use(express.static('voice_messages'));

const users = [];
const voiceMessagesDir = path.join(__dirname, "voice_messages");
if (!fs.existsSync(voiceMessagesDir)) {
  fs.mkdirSync(voiceMessagesDir);
}

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log(`User ${socket.user} disconnected`);
    if (socket.user) {
      users.splice(users.indexOf(socket.user), 1);
      io.sockets.emit("users", users);
    }
  });

  // Handle chat messages
  socket.on("message", (message) => {
    io.sockets.emit("message", { user: socket.user, message, sender: socket.user });
  });

  // Handle private messages
  socket.on("private", (data) => {
    io.to(data.receiverId).emit("private", { sender: socket.user, message: data.message });
  });

  // Handle voice messages
  socket.on("voiceMessage", (audioDataUrl) => {
    const base64Data = audioDataUrl.replace(/^data:audio\/wav;base64,/, "");
    const fileName = `voice_message_${Date.now()}.wav`;
    const filePath = path.join(voiceMessagesDir, fileName);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
      if (err) {
        console.error("Error saving voice message:", err);
      } else {
        console.log("Voice message saved as:", fileName);
        io.emit("voiceMessageSaved", fileName, { user: socket.user, sender: socket.user });
      }
    });
  });

  // Add user to the list
  socket.on("adduser", (username) => {
    socket.user = username;
    users.push(username);
    io.sockets.emit("users", users);
  });
});





































// Define routes
const routes = ['/index.html', '/class.html', '/uploxads/vijxewer','/mybooks', '/upload', '/login', '/signup', '/admin', '/homes'];
routes.forEach(route => {
  app.get(route, (req, res) => {
    console.log("Render:", route);
    res.render(route.slice(1), { files: [] });
  });
});

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
// /*
*/


const express = require("express");
const Socket = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
app.use(express.static('public'))
app.use(express.static('voice_messages'))
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'));
app.use(express.static('voice_messages'));

const io = Socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = [];

// Define the directory to save voice messages
const voiceMessagesDir = path.join(__dirname, "voice_messages");

// Create the directory if it doesn't exist
if (!fs.existsSync(voiceMessagesDir)) {
  fs.mkdirSync(voiceMessagesDir);
}

io.on("connection", (socket) => {
  console.log("A user connected");
socket.on("disconnect", () => {
    console.log(`user ${socket.user} is disconnected`);
    if (socket.user) {
      users.splice(users.indexOf(socket.user), 1);
      io.sockets.emit("user", users);
     // console.log("remaining users:", users);
    }
  });



  socket.on("message", (message) => {
    // Handle chat messages
    io.sockets.emit("message", { user: socket.user, message, sender: socket.user });
  });

  socket.on("private", (data) => {
    // Handle private messages
    io.to(data.receiverId).emit("private", {
      sender: socket.user,
      message: data.message,
    });
  });

  socket.on("voiceMessage", (audioDataUrl) => {
    const base64Data = audioDataUrl.replace(/^data:audio\/wav;base64,/, "");
    const fileName = `voice_message_${Date.now()}.wav`;
    const filePath = path.join(voiceMessagesDir, fileName);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
      if (err) {
        console.error("Error saving voice message:", err);
      } else {
        console.log("Voice message saved as:", fileName);
        // Emit the path to the saved file
   //  io.emit("voiceMessageSaved", `${fileName}`);
     
        io.emit("voiceMessageSaved", `${fileName}`, { user: socket.user, sender: socket.user });
        
        
        
      }
    });
  });

  socket.on("adduser", (username) => {
    socket.user = username;
    users.push(username);
    io.sockets.emit("users", users);
  });



socket.on('join class', ({ className, userName }) => {
    socket.join(className);
    console.log(`${userName} joined class ${className}`);
    // Broadcast to all clients in the same room except the sender
  socket.to(className).emit('class joined', { className, userName });
 });



socket.on("code change", code => {
  
  console.log(code)
    socket.emit("code change", code);
  });


socket.on('document-update', (msg) => {
    console.log('Document updated:', msg);
    // Broadcast the updated document to all other connected clients
    socket.broadcast.emit('document-update', msg);
  });


 /* socket.on('code change', (code) => {
    console.log(code)
    // Broadcast to all clients in the same room except the sender
    socket.to(className).emit('code change', code);
  });*/

})
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server listening on PORT: ", PORT);
});

