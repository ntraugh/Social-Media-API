const router = require("express").Router()

const {
    getAllThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughts-controller")

router.route("/").get(getAllThoughts).post(createThought)  
router.route("/:id").get(getThoughtId).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reaction").post(addReaction).delete(deleteReaction)

module.exports = router