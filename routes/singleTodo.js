const express = require(`express`);
const router = express.Router();
const bodyParser = require(`body-parser`);
const Todo = require(`../todo.model`);

router.use(bodyParser.json());

router.route(`/`).get((req, res) => {
    res.redirect(`/`);
});

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        // res.send(`Obtaining todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be found`);
            } else {
                res.json(todo);
            }
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        // res.send(`Updating todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be found`);
            } else {
                todo.todoDescription = req.body.todoDescription;
                todo.todoDateCreated = req.body.todoDateCreated;
                todo.todoCompleted = req.body.todoCompleted;

                todo.save().then(todo => {
                    res.send(`Todo updated!`);
                })
                    .catch(err => res.status(400).send(`Update not possible.`));
            }
        });
    });

module.exports = router;