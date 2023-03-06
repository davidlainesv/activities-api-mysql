const pool = require('../../database.js');
const express = require('express');
const controller = require('../mysql/students_mysql.js');

const router = express.Router();

// create item
router.post('/', async function (req, res) {
    try {
        const result = await controller.insert_student(pool, req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.json({ message: req });
    }
})

// read items
router.get('/', async function (req, res) {
    try {
        const results = await controller.select_students(pool);
        return res.json(results);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// read item
router.get('/:id', async function (req, res) {
    try {
        const result = await controller.select_student(pool, req.params.id);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error });
    }

});

// update item
router.put('/:id', async function (req, res) {
    res.json({ message: "TODO" });
})

// delete item
router.delete('/:id', async function (req, res) {
    res.json({ message: "TODO" });
})

module.exports = router