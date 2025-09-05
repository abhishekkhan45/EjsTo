const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contactModel");


//database connected successfull
const URL = `mongodb+srv://EIS:EJS@cluster0.jlwc67p.mongodb.net/ejstodo?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(URL).then(() => {
  console.log("Database is connected");
});

//middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));



//router
app.get("/", async (req, res) => {
  const contacts = await Contact.find();

  res.render(__dirname + "/views/home.ejs", { contacts: contacts });
});
app.get("/show-contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.render(__dirname + "/views/show-contact.ejs", { contact: contact });
});
app.get("/add-contact", (req, res) => {
  res.render(__dirname + "/views/add-contact.ejs");
});




app.post("/add-contact",  async (req, res) => {

    await Contact.create(req.body);

    res.redirect("/");

   


});
app.get("/update-contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.render(__dirname + "/views/update-contact.ejs", { contact: contact });
});

app.post("/update-contact/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//liten
app.listen(3000, () => {
  console.log("server is started sir...");
});
