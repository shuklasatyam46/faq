import express from 'express';
import { getFAQ, createFAQ, updateFAQ, deleteFAQ} from '../controllers/faq.controllers.js';
const router = express.Router();

router.get('/', getFAQ);
router.post('/', createFAQ);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);
/*router.get('/?lang=code', getTranslations);*/

export default router;
