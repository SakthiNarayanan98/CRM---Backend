import * as Lead from '../models/lead.model.js';

// Public endpoint: create enquiry (no auth)
export async function submitPublicLead(req, res) {
  try {
    const { name, email, phone, course_interest, message } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });

    const lead = await Lead.createLead({ name, email, phone, course_interest, message });
    res.status(201).json({ lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Public endpoint: view public/unclaimed enquiries (no auth)
export async function viewPublicLeads(req, res) {
  try {
    const leads = await Lead.getPublicLeads();
    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Auth required: fetch unclaimed leads
export async function getUnclaimedLeads(req, res) {
  try {
    const leads = await Lead.getUnclaimedLeads();
    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Auth required: claim a lead
export async function claimLead(req, res) {
  try {
    const leadId = parseInt(req.params.id, 10);
    if (!leadId) return res.status(400).json({ message: 'invalid lead id' });

    // attempt to claim (only succeeds if unclaimed)
    const claimed = await Lead.claimLead(leadId, req.user.id);
    if (!claimed) return res.status(400).json({ message: 'Lead already claimed or does not exist' });

    res.json({ lead: claimed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Auth required: fetch leads claimed by logged-in user
export async function getMyLeads(req, res) {
  try {
    const leads = await Lead.getLeadsByCounselor(req.user.id);
    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
