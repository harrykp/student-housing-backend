const express = require('express');
const router = express.Router();
const {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel,
  deleteHostel
} = require('../controllers/hostelsController');

router.get('/', getAllHostels);
router.get('/:id', getHostelById);
router.post('/', createHostel);
router.put('/:id', updateHostel);
router.delete('/:id', deleteHostel);

module.exports = router;
