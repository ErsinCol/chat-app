import express from 'express'
// controllers 
import deleteController from '../controllers/delete.mjs'

const router = express.Router()

router 
    .delete('/room/:roomId', deleteController.deleteRoomById)
    .delete('/message/:messageId', deleteController.deleteMessageById)

export default router
