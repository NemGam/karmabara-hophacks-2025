import { findProfileById, findById } from "../repos/user.repo";

export const getUser = async(id: string) => {
    const response = await findById(id);
    return response;
}

export const getUserProfile = async(id: string) => {
    const response = await findProfileById(id);
    return response;
}