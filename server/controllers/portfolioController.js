const Portfolio = require("../models/Portfolio");

exports.getAllPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPortfolioByCategory = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ category: req.params.category });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({ message: "Portfolio item added", portfolio });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
