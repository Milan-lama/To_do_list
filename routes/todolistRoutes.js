const express = require("express")
const validateToken = require('../middleware/validateToken')
const router = express.Router()
const {taskList,taskCreate,taskUpdate,taskDelete} = require("../controllers/todolistController")

router.get('/',validateToken,taskList)
router.post('/',validateToken,taskCreate)

router.put('/',validateToken,taskUpdate)

router.delete('/',validateToken,taskDelete)

module.exports = router