const venom = require('venom-bot');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let qrCodeBase64 = '';

venom.create(
  'sessionName', // Nama sesi yang akan dibuat
  (base64Qrimg) => {
    qrCodeBase64 = base64Qrimg;
    console.log('QR RECEIVED');
  },
  undefined,
  { headless: true }
).then((client) => {
  app.get('/send', async (req, res) => {
    // Kirim pesan ke nomor WhatsApp yang ditentukan
    await client.sendText('5511999999999@c.us', 'Hello from Render!');
    res.send('Sent');
  });
});

app.get('/qr', (req, res) => {
  // Menampilkan QR code di halaman
  res.send(`<img src="${qrCodeBase64}" style="width:300px"/>`);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
