const { Thought, User } = require("../models")

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: "reactions", select: "-__v"})
        .populate({ path: "thought", select: "-__v"})
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    createThought({ params, body }, res) {
        Thought.create(body)
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
        Thought.findOne({ _id: params.id })
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
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
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
        Thought.findOneAndDelete({_id: params.id})
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
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reaction: body}}, {new: true, runValidators: true})
        .populate({ path: "reactions", select: "-__v"})
        .select("-__v")
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
