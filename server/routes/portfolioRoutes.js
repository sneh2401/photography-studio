const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllPortfolio,
  getPortfolioByCategory,
  addPortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

router.get("/", getAllPortfolio);
router.get("/:category", getPortfolioByCategory);
router.post("/", protect, addPortfolio);
router.delete("/:id", protect, deletePortfolio);

module.exports = router;
