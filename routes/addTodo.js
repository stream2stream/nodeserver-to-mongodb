const express = require(`express`);
const router = express.Router();
const Todo = require(`../todo.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    // res.send(`Adding Todo`);
    const todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': `todo added successfully` });
        })
        .catch(err => res.status(400).send(`Adding new todo failed`));
});

module.exports = router;