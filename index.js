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

// 1. GET - List All Coffee Drinks
app.get("/api/v1/coffee-drinks", (req, res) => {
  res.json(coffeeDrinks);
});

// 2. POST - Add New Coffee Drink
app.post("/api/v1/coffee-drinks", (req, res) => {
  const { name, icon, description } = req.body;
  const newDrink = { id: uuidv4(), name, icon, description };
  console.log("📥 New coffee added:", newDrink);
  coffeeDrinks.push(newDrink);
  res.status(201).json(newDrink);
});

// 3. PUT - Update Coffee Drink
app.put("/api/v1/coffee-drinks/:id", (req, res) => {
  const { id } = req.params;
  const { name, icon, description } = req.body;

  let found = false;
  coffeeDrinks = coffeeDrinks.map((d) => {
    if (d.id === id) {
      found = true;
      return { id, name, icon, description };
    }
    return d;
  });

  if (found) {
    const updatedDrink = coffeeDrinks.find((d) => d.id === id);
    console.log("🔄 Coffee updated:", updatedDrink);
    res.json(updatedDrink);
  } else {
    res.status(404).json({ error: "Coffee not found", receivedId: id });
  }
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
