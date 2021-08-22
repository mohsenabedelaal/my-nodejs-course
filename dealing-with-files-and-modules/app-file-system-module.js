const fs = require("fs");
//read file
fs.readFile("note.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});
// write file
fs.writeFile("note.txt", "We are writing into the file", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("we wrote successfully in the file");
  }
});
// append file
fs.appendFile("note.txt", "\r\ndklasjldkjaslkdjsa !!", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("we wrote successfully in the file");
  }
});
// create folder
if (!fs.existsSync("newFolder")) {
  fs.mkdir("newFolder", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("a new folder is created");
    }
  });
}
// delete folder
if (fs.existsSync("newFolder")) {
  fs.rmdir("newFolder", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("a folder is deleted");
    }
  });
}
// delete a file
if (fs.existsSync("note.txt")) {
  fs.unlink("note.txt", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("a file is deleted");
    }
  });
}
