import { Router } from "express";
import { addAttendee, getEvent, getEvents, getAttendees } from "@controllers/events.controller";

const router = Router();

router.get('/', getEvents); //Get all events
router.get('/:eventId', getEvent); //Get a specific event
router.get('/:eventId/attendees', getAttendees);  //Get all attendees. Owner gets statuses too
router.post('/:eventId/register', addAttendee); //Register new attendee

//(Organization only access)
// router.post('/') //Create new event
// router.patch('/:eventId'); //Cancel event. If people were checked-in, grant 50% of reward
// router.post('/:eventId/checkins'); //Check-in attendee
// router.put('/:eventId/checkins/:userId'); //Approve or cancel attendee

export { router };