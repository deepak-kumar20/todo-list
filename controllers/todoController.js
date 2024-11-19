const Todo = require('../models/todoModel')

//finding the todo
// exports.getTodo = (req, res) => {
//     Todo.find()
//         .then(todos => {
//         res.render('index',{todos})
//         })
//         .catch((err) => {
//             console.log('erro in finding todos', err)
//              res.status(500).send("Error finding todo");
//          })
// }

//adding the todo
exports.addTodo = (req, res) => {
    const { task } = req.body;

    const newTodo = new Todo({
        task
    })
    newTodo.save()
        .then(() => res.redirect('/'))
        .catch((err) => {
            console.log('error in adding todo', err)
            res.status(500).send("Error adding todo");
})
}

//deleting the todo
exports.deleteTodo = (req, res) => {
    const { todoId } = req.body
    
    Todo.findByIdAndDelete(todoId)
        .then(() => res.redirect('/'))
        .catch((err) => {
            console.log('error in deleting the todo', err);
             res.status(500).send("Error deleting todo");
        })
}
