const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// Initial data with unique IDs
let coffeeDrinks = [
  {
    id: uuidv4(),
    name: "Americano",
    icon: "☕",
    description: "Espresso and hot water",
    strength: 4,
  },
  {
    id: uuidv4(),
    name: "Latte",
    icon: "🥛",
    description: "Espresso with steamed milk",
    strength: 2,
  },
  {
    id: uuidv4(),
    name: "Cappuccino",
    icon: "🍶",
    description: "Espresso, milk foam, and steamed milk",
    strength: 3,
  },
  {
    id: uuidv4(),
    name: "Flat White",
    icon: "⚪",
    description: "Smooth espresso with thin milk foam",
    strength: 3,
  },
  {
    id: uuidv4(),
    name: "Mocha",
    icon: "🍫",
    description: "Espresso with chocolate and milk",
    strength: 2,
  },
  {
    id: uuidv4(),
    name: "Turkish Coffee",
    icon: "🏺",
    description: "Traditional slow-brewed delight",
    strength: 5,
  },
  {
    id: uuidv4(),
    name: "Cold Brew",
    icon: "🧊",
    description: "12-hour steeped cold refreshment",
    strength: 4,
  },
];

// 1. GET - List All Coffee Drinks
app.get("/api/v1/coffee-drinks", (req, res) => {
  res.json(coffeeDrinks);
});

// 2. POST - Add New Coffee Drink
app.post("/api/v1/coffee-drinks", (req, res) => {
  const { name, icon, description, strength } = req.body;

  const newDrink = {
    id: uuidv4(),
    name,
    icon,
    description,
    strength: strength ?? 3, // default
  };

  console.log("📥 New coffee added:", newDrink);
  coffeeDrinks.push(newDrink);
  res.status(201).json(newDrink);
});

// 3. PUT - Update Coffee Drink
app.put("/api/v1/coffee-drinks/:id", (req, res) => {
  const { id } = req.params;
  const { name, icon, description, strength } = req.body;

  const drink = coffeeDrinks.find((d) => d.id === id);

  if (!drink) {
    return res.status(404).json({ error: "Coffee not found" });
  }

  drink.name = name;
  drink.icon = icon;
  drink.description = description;
  drink.strength = strength;

  console.log("🔄 Coffee updated:", drink);
  res.json(drink);
});

// 4. DELETE - Remove Coffee Drink
app.delete("/api/v1/coffee-drinks/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = coffeeDrinks.length;

  coffeeDrinks = coffeeDrinks.filter((d) => d.id !== id);

  if (coffeeDrinks.length < initialLength) {
    console.log(`🗑️ Coffee deleted. ID: ${id}`);
    res.status(204).send();
  } else {
    res
      .status(404)
      .json({ error: "Coffee to delete not found", receivedId: id });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`☕ API running on port ${PORT}`));
