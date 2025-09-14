import { findProfileById, findById } from "@repos/user.repo";
import { NotFoundError } from "../errors";

export const getUser = async(id: string) => {
    const user = await findById(id);
    if (!user) throw new NotFoundError(`user with id=${id} does not exist`);
    return user;
}

export const getUsers = async(sort: string, order: string) => {
    // const users = await all
}

export const getUserProfile = async(id: string) => {
    const profile = await findProfileById(id);
    if (!profile) throw new NotFoundError(`user with id=${id} does not exist`);
    return profile;
}