//? Core Module
const fs = require("fs");

const chalk = require("chalk");
const cScs = chalk.green.inverse.bold;
const cErr = chalk.red.inverse.bold;

const validator = require("validator");

//? Membuat Folder Data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
//? Membuat File Contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  //! Cek Duplikat
  const findName = contacts.find((contact) => contact.nama === nama);

  if (findName) {
    console.log(cErr("Nama sudah terdaftar di contact, gunakan nama lain!"));
    return false;
  }
  //! Cek Email (nester karena email tidak required)
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(cErr("Email tidak valid!"));
      return false;
    }
  }
  //! Cek No HP
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(cErr("Nomor HP bukan Indonesia!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
  console.log(cScs("Contact berhasil masuk ke dalam file contacs"));
};

//? Untuk command "list"
const listContact = () => {
  const contacts = loadContact();
  console.log(
    chalk.blue.inverse.bold("Daftar contact yang sudah ditambahkan: ")
  );
  contacts.forEach((contact, i) => {
    console.log(
      `${i + 1}. ${contact.nama} - ${contact.email} - ${contact.noHp}`
    );
  });
};

//? Untuk command "detail"
const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => {
    contact.nama.toLowerCase() === nama.toLowerCase();
  });
  if (!contact) {
    console.log(cErr(`${nama} tidak ditemukan!`));
    return false; //agar tidak berlanjut programnya
  }
  console.log(chalk.blue.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

//? Untuk command "delete"
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase();
  });
  if (contacts.length === newContact.length) {
    console.log(cErr(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact, null, 2));
  console.log(cScs(`Data contact ${nama} berhasil dihapus!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
