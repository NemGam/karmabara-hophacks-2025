import { EventsSortOptions, SortOrder } from './../types/dbTypes';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotImplementedError, UserExistsError } from '../errors';
import { getAll } from '../repos/events.repo';
import { addAttendeeById, getAllAttendees, getEventDataById } from '../services/events.service';
import { SqliteError } from 'better-sqlite3';

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { sort = 'start_time', order = 'ASC' } = req.query as {
            sort?: EventsSortOptions;
            order?: SortOrder;
        };
        //Some validation. Maybe add Zod
        if (order != 'DESC') order = 'ASC';
        if (!sort || ['start_time', 'distance'].includes(sort)) sort = 'start_time';

        const events = await getAll(sort, order);
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) throw new BadRequestError('eventId is missing');

        const event = await getEventDataById(eventId);
        res.status(200).send(event);
    } catch (err) {
        next(err);
    }
};

export const addAttendee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) throw new BadRequestError('eventId is missing');
        if (!req.body || !req.body.userId) throw new BadRequestError('userId is missing'); 
        const userId = req.body.userId;

        await addAttendeeById(eventId, userId);
        res.sendStatus(201);
    } catch (err: any) {
        if (err.code == 'SQLITE_CONSTRAINT_PRIMARYKEY'){
            err = new UserExistsError('already registered for this event');
        }
        next(err);
    }
};

export const getAttendees = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) throw new BadRequestError('eventId is missing');

        const event = await getAllAttendees(eventId);
        res.status(200).send(event);
    } catch (err) {
        next(err);
    }
};

export const checkIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) throw new BadRequestError('eventId is missing');

        const event = await getEventDataById(eventId);
        res.status(200).send(event);
    } catch (err) {
        next(err);
    }
};
