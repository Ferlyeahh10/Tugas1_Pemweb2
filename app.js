const express = require('express');
const app = express();
const PORT = 3000;

// Middleware agar Express bisa membaca JSON dari body request
app.use(express.json());

// Data Dummy Awal
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
];

// 1. Home Endpoint
app.get('/', (req, res) => {
  res.send('API Mahasiswa berjalan');
});

// 2. GET Semua Mahasiswa
app.get('/students', (req, res) => {
  res.json(students);
});

// 3. GET Mahasiswa Berdasarkan ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Mahasiswa tidak ditemukan');
  }
});

// 4. POST Tambah Mahasiswa
app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length + 1, // Auto increment sederhana
    nama: req.body.nama,
    jurusan: req.body.jurusan
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 5. PUT Update Mahasiswa
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex !== -1) {
    students[studentIndex] = {
      id: id,
      nama: req.body.nama,
      jurusan: req.body.jurusan
    };
    res.json(students[studentIndex]);
  } else {
    res.status(404).send('Mahasiswa tidak ditemukan');
  }
});

// 6. DELETE Mahasiswa
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    res.send(`Mahasiswa dengan id ${id} berhasil dihapus`);
  } else {
    res.status(404).send('Mahasiswa tidak ditemukan');
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
