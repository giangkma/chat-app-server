import express from 'express';
import chatController from '../controllers/chat.controller';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/search', isAuth, chatController.findPeople);

router.get('/conversation', isAuth, chatController.getConversation);
router.get('/get-messages', isAuth, chatController.getMessages);
router.get('/conversation-list', isAuth, chatController.getConversationList);
router.post('/send-message', isAuth, chatController.sendMessage);

export default router;
