import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Account } from "../Models/account.model";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Create an account
 * get all account
 * get single account
 */
const createAccount = asyncHandler(async (req, res) => {
    const { accountName, balance } = req.body;
    if ([accountName, balance].some(item => item.trim() === "")) {
        throw new ApiError(500, "All fields are required to create an account");
    }

    try {
        const user = req.user;
        const account = new Account({ accountName, owner: user._id, balance });
        await account.save();
        res.status(201).json(new ApiResponse(201, account, "Account created successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Error creating account");
    }
});


const getAllAccount = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new ApiError(401, "Invalid User");
        }

        const allAccounts = await Account.find({ owner: user._id }).populate('owner');
        res.status(200).json(new ApiResponse(200, allAccounts, "All accounts fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Can't fetch all accounts! Try again later.");
    }
});


const getAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;

    try {
        const account = await Account.findById(accountId).populate('owner');
        if (!account) {
            throw new ApiError(404, "Account not found");
        }
        res.status(200).json(new ApiResponse(200, account, "Account fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Error fetching account");
    }
});

export { createAccount, getAccount, getAllAccount };