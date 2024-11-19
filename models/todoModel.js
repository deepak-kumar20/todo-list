const mongoose = require('mongoose');

const todoSchema = {
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }

}
// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;