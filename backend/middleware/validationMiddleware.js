import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
    return [
        validateValues, 
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg);
                if(errorMessages[0].startsWith('Job ID:')){
                    throw new NotFoundError(errorMessages);
                }
                if(errorMessages[0].startsWith('Not Authorized')){
                    throw new UnauthorizedError('Not Authorized to access this route.'); 
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
}

export const validateJobInput = withValidationErrors([
    body('company')
        .notEmpty().withMessage('Company is required.'),
    body('position')
        .notEmpty().withMessage('Position is required.'),
    body('jobLocation')
        .notEmpty().withMessage('Job Location is required.'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS)).withMessage("Invalid status."),
    body('jobType')
        .isIn(Object.values(JOB_TYPE)).withMessage("Invalid type."),
]);

export const validateIdParam = withValidationErrors([
    // must be match on routes
    param('id').custom(async (value, { req }) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if(!isValid) throw new BadRequestError('Invalid MongoDB ID');

        const job = await Job.findById(value);
        if(!job) throw new NotFoundError(`Job ID:${value} does not exist`);

        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();

        if(!isAdmin && !isOwner) throw new UnauthorizedError('Not Authorized to access this route.'); 
        
    })
]);

export const validateRegisterInput = withValidationErrors([
    body('firstName')
        .notEmpty().withMessage('First Name is required.'),
    body('lastName')
        .notEmpty().withMessage('Last Name is required.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.')
        .custom( async (email) => {
            const user = await User.findOne({ email });
            if(user){
                throw new BadRequestError('Email already exists.');
            }
        }),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min:8 }).withMessage('Password must be at least 8 Characters.'),
    body('location')
        .notEmpty().withMessage('Location is required.'),
    body('confirmpassword')
        .notEmpty().withMessage('Confirm Password is required.')
        .custom( async (confirmpassword, { req }) => {
            if(confirmpassword !== req.body.password){
                throw new BadRequestError('Confirm Password is not match.');
            }
        }),
]);

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
]);

export const validateUpdateUserInput = withValidationErrors([
    body('firstName')
        .notEmpty().withMessage('First Name is required.'),
    body('lastName')
        .notEmpty().withMessage('Last Name is required.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.')
        .custom( async (email, { req }) => {
            const user = await User.findOne({ email });
            if(user && user._id.toString() !== req.user.userId){
                throw new BadRequestError('Email already exists.');
            }
        }),
    body('location')
        .notEmpty().withMessage('Location is required.'),
]);