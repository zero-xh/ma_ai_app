import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';

const router = express();

router.get('/', (req: Request, res: Response) => {
   res.send('hello world');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({
      message: 'hello world',
   });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

export default router;
