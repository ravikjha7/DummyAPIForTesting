const express = require('express')
const router = express.Router()
const employee = require('../models/employee.model')
const m = require('../helpers/middlewares')

// Routes

router.get('/all', async (req, res) => {
    await employee.getEmployees()
    .then(employees => res.json(employees))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    await employee.getEmployee(id)
    .then(employee => res.status(200).json(employee))
    .catch(err => {
        res.status(404).json({
            "message": `Employee with ${id} was not found`
        })
    })
})

router.post('/', async (req, res) => {

    console.log("Request Aayi");

    await employee.addEmployee({
        name: "Sapana Khedkar",
        city: "Ahmednagar"
    })
    .then(employee => res.status(201).json({
        "employeeId": employee.id
    }))
    .catch(err => res.status(400).json({ message: err.message }))
})

router.put('/:id', m.checkFieldsPost, async (req, res) => {
    const id = req.params.id;
    await employee.updatePost(id, req.body)
    .then(employee => res.status(201).json(employee))
    .catch(err => {
        res.status(404).json({
            "message": `Employee with ${id} was not found`
        })
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    await employee.deleteEmployee(id)
    .then(employee => res.status(200).json(employee))
    .catch(err => {
        res.status(404).json({
            "message": `Employee with ${id} was not found`
        })
    })
})

module.exports = router;