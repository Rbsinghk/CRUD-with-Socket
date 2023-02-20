const user = require("./models/user");
const bcrypt = require('bcrypt');
// const auth = require("./middleware/auth")

module.exports.userdata = (io, socket) => {

  const emitUser = async () => {
    const response = await user.find();
    socket.emit("server:loaduser", response);
  };
  emitUser();

  socket.on("client", async (data) => {
    const { name, email, password } = data;
    const result = await user.create({ name, email, password });
    io.emit("server1", result);
  });

  socket.on("client:login", async (data) => {
    const { email, password } = data;
    const userMail = await user.findOne({ email })
    if (userMail == null) {
      io.emit("serverLogin", "EMail & Password is Wrong")
    } else {
      const isMatch = await bcrypt.compare(password, userMail.password);
      const token = await userMail.generateAuthToken();
      if (isMatch) {
        io.emit("serverLogin", token)
      } else {
        io.emit("serverLogin", "EMail & Password is Wrong")
      }
    }
  })

  socket.on("client:create", async (data) => {
    const { name, email, password } = data;
    const result = await user.create({ name, email, password })
    io.emit("serverGetCreate", result)
  })

  socket.on("client:deleteUser", async (_id) => {
    await user.findByIdAndDelete(_id);
    io.emit("clientDelete", "User Deleted SuccessFully")
  });

  socket.on("clientId", async (_id) => {
    const result = await user.findById(_id);
    socket.emit("userId", result);
  });

  socket.on("client:updateuser", async (data) => {
    const { id, name, email, password } = data;
    await user.findByIdAndUpdate(id, { name, email, password });
    emitUser();
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
  });
};
