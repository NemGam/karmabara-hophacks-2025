import { NotFoundError } from '../errors';
import { SortOrder, EventsSortOptions } from '../types/dbTypes';
import { findAllAttendees, get, getAll, register } from '@repos/events.repo';

export const getEvents = async (sort: EventsSortOptions, order: SortOrder) => {
    return await getAll(sort, order);
}

export const getEventDataById = async (eventId: string) => {
    const event = await get(eventId);
    if (!event) throw new NotFoundError(`Event with id ${eventId} does not exist`);
    return event;
}

export const getAllAttendees = async (eventId: string) => {
    const attendees = await findAllAttendees(eventId);
    return attendees;
}

export const addAttendeeById = async (eventId: string, userId: string) => {
    const response = await register(eventId, userId);
    return true;
}