const { User } = require("../models")

const userController = {
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getAllUsers(req, res) {
        User.find()
        .populate({ path: "thoughts", select: "-__v"})
        .populate({ path: "friends", select: "-__v"})
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getUserId({params}, res){
        User.findOne({_id: params.userId})
        .populate({ path: "thoughts", select: "-__v"})
        .populate({ path: "friends", select: "-__v"})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user with given Id."})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.userId}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user with given Id."})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.userId})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user with given Id."})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$push: {friend: params.friendId}}, {new: true})
        .populate({ path: "friends", select: ("-__v")})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user with given Id."})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.json(err)
        })
    },
    removeFriend({params}, res) {
        User.findOneAndDelete({_id: params.userId}, {$pull: {friend: params.friendId}}, {new: true})
        .populate({ path: "friends", select: "-__v"})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user with given Id."})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

}

module.exports = userController


