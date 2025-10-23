import express from 'express';
import * as LeadCtrl from '../controllers/lead.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Public endpoints
router.post('/public/enquiries', LeadCtrl.submitPublicLead);
router.get('/public/enquiries', LeadCtrl.viewPublicLeads);

// Auth endpoints
router.get('/leads/unclaimed', auth, LeadCtrl.getUnclaimedLeads);
router.post('/leads/:id/claim', auth, LeadCtrl.claimLead);
router.get('/leads/my', auth, LeadCtrl.getMyLeads);

export default router;
