import { NextFunction, Request, Response } from "express";
import { HttpError, UnauthenticatedError } from "../errors.js";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    
    if (err instanceof HttpError){
        console.error(err.message);
        return res.status(err.status).json({message: err.message});
    }

    console.error(err.message);
    res.status(500).json({message: "Something went wrong."});
}