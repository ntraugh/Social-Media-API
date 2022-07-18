const router = require("express").Router();
// API routes below
const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/users-controller");

// get & post routes
router.route("/").get(getAllUsers).post(createUser)

router.route("/:userId").get(getUserId).put(updateUser).delete(deleteUser)
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend)

module.exports = router