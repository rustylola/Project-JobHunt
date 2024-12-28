import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id:req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword});
};

export const updateUser = async (req, res) => {
    const newUser = {...req.body};
    // remove password upon update
    delete newUser.password;

    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
    
    if(req.file && updateUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({message:'User updated.'});
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({users, jobs});
};

