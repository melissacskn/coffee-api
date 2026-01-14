const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // npm install uuid

const app = express();
app.use(cors());
app.use(express.json());

// Başlangıç verileri (ID eklendi)
let coffeeDrinks = [
  {
    id: uuidv4(),
    name: "Americano",
    icon: "☕",
    description: "Espresso and hot water",
  },
  {
    id: uuidv4(),
    name: "Latte",
    icon: "🥛",
    description: "Espresso with steamed milk",
  },
  {
    id: uuidv4(),
    name: "Cappuccino",
    icon: "🍶",
    description: "Espresso, milk foam, and steamed milk",
  },
  {
    id: uuidv4(),
    name: "Flat White",
    icon: "⚪",
    description: "Smooth espresso with thin milk foam",
  },
  {
    id: uuidv4(),
    name: "Mocha",
    icon: "🍫",
    description: "Espresso with chocolate and milk",
  },
  {
    id: uuidv4(),
    name: "Turkish Coffee",
    icon: "🏺",
    description: "Traditional slow-brewed delight",
  },
  {
    id: uuidv4(),
    name: "Cold Brew",
    icon: "🧊",
    description: "12-hour steeped cold refreshment",
  },
];

// 1. GET - Hepsini Listele
app.get("/api/v1/coffee-drinks", (req, res) => {
  res.json(coffeeDrinks);
});

// 2. POST - Yeni Kahve Türü Ekle
app.post("/api/v1/coffee-drinks", (req, res) => {
  const { name, icon, description } = req.body;
  const newDrink = { id: uuidv4(), name, icon, description };
  console.log("📥 Yeni kahve geldi:", newDrink); // Bu satırı ekle
  coffeeDrinks.push(newDrink);
  res.status(201).json(newDrink);
});

// 3. PUT - Kahve Türünü Güncelle
// index.js içindeki PUT kısmını bu şekilde değiştir:
app.put("/api/v1/coffee-drinks/:id", (req, res) => {
  const { id } = req.params;
  const { name, icon, description } = req.body;

  let index = coffeeDrinks.findIndex((d) => d.id === id);

  if (index !== -1) {
    coffeeDrinks[index] = { id, name, icon, description };
    res.json(coffeeDrinks[index]); // Başarılıysa JSON dönüyor
  } else {
    // HATA: .send yerine .json kullanıyoruz ki mobil uygulama çökmesin
    res.status(404).json({ error: "Kahve bulunamadı", receivedId: id });
  }
});

// 4. DELETE - Kahve Türünü Sil
app.delete("/api/v1/coffee-drinks/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = coffeeDrinks.length;

  coffeeDrinks = coffeeDrinks.filter((d) => d.id !== id);

  if (coffeeDrinks.length < initialLength) {
    res.status(204).send(); // Başarıyla silindi
  } else {
    // Silinemediyse JSON hata dönüyoruz (Mobil uygulama çökmesin diye)
    res
      .status(404)
      .json({ error: "Silinecek kahve bulunamadı", receivedId: id });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`☕ API running on port ${PORT}`));
