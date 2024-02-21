const path = require("path");
const rootDir = require('../../utils/path');
const fs = require("fs");

exports.userLogin = (req, res) => {
  console.log(req.body,rootDir);
  const file = path.join(rootDir, 'data', 'users.json');
  fs.readFile(file, (err, fileContent) => {
    const users = JSON.parse(fileContent);
    const isUserExist = users.find(user => user.email === req.body.email);
    if(isUserExist !== undefined) {
      return res.send({ status: true, data: isUserExist });
    }
    return res.send({ status: false, message: "User doesn't exist."});
  })    
}