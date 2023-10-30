import express from 'express'


const router = express.Router()

router.get('/', (req, res) => {
    res.send(['4', '5', '6'])
})

router.post('/', (req, res) => {
    res.send({ 'hello': 'world' })
})

export default router