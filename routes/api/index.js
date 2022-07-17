const router = require("express").Router()
const userRoute = require("./users")
const thoughtRoute = require("./thoughts")

router.use("/users", userRoute)
router.use("/thoughts", thoughtRoute)

module.exports = router; 

