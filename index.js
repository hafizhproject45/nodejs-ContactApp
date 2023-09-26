const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "No Hp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

//menampilkan daftar semua nama & no HP contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no HP",
  handler() {
    listContact();
  },
});

//menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

//menampilkan detail sebuah contact
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
