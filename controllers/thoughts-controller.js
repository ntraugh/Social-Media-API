const { Thought, User } = require("../models")

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        // .populate({ path: "thoughts", select: "-__v"})
        // .populate({ path: "reactions", select: "-__v"})
        // .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    createThought({ params, body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                { $push: { thoughts: thoughtData._id}},
                { new: true}
            )
        })
        .then(({dbThoughtData}) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought with given ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },
    getThoughtId({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({ path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: "No thought with given ID"})
            return
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        });
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
        .populate({ path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought with given ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    }, 
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought with given ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err)) 
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$addToSet: {reactions: body}}, {new: true, runValidators: true})
        // .populate({ path: "reactions", select: "-__v"})
        // .select("-__v")
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought with given ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: { reactionId: params.reactionId}}, {new: true})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err))
    }
}

module.exports = thoughtController
