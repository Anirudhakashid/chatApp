import Message from "../models/message.models.js";
import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from "../lib/cloudinary.js";

// get all contacts except logged in user from the database
const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  if (filteredUsers.length === 0) {
    throw new ApiError(404, "No contacts found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, filteredUsers, "Contacts fetched successfully!")
    );
});

// find messages between logged in user and another user by receiver's userId
const getMessagesByUserId = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const { id: userToChatWithId } = req.params;

  if (!userToChatWithId) {
    throw new ApiError(400, "User ID is required");
  }

  const userExists = await User.findById(userToChatWithId);
  if (!userExists) {
    throw new ApiError(404, "User not found");
  }

  const messages = await Message.find({
    $or: [
      { senderId: loggedInUserId, receiverId: userToChatWithId },
      {
        senderId: userToChatWithId,
        receiverId: loggedInUserId,
      },
    ],
  }).sort({ createdAt: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully!"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const senderId = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new ApiError(400, "Receiver ID is required");
  }

  if (senderId.equals(receiverId)) {
    throw new ApiError(400, "Cannot send message to yourself");
  }

  if (!text && !image) {
    throw new ApiError(400, "Message cannot be empty");
  }

  const receiverExists = await User.findById(receiverId);
  if (!receiverExists) {
    throw new ApiError(404, "User not found");
  }

  let uploadImageUrl;
  if (image) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(image);
      uploadImageUrl = uploadResponse?.secure_url;
    } catch (error) {
      throw new ApiError(400, "Image upload fail");
    }
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: uploadImageUrl,
  });

  await newMessage.save();

  //TODO: add socket.io to send real-time messages

  return res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully!"));
});

//from all the contacts extract the contact with whom the logged in user has exchanged messages
const getAllChats = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  //find all the messages where the senderId or receiverId is equal to the logged in user's id
  // const messages = await Message.find({
  //   $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  // });

  // if (messages.length === 0) {
  //   throw new ApiError(404, "No chats found");
  // }
  // //extract the user id of the other user from the messages
  // //new Set: removes the dublicates
  // //... converts the set back to array
  // const chatPartnerId = [
  //   ...new Set(
  //     messages.map((msg) =>
  //       msg.senderId.toString() === loggedInUserId.toString()
  //         ? msg.receiverId.toString()
  //         : msg.senderId.toString()
  //     )
  //   ),
  // ];
  // //find the partner's details
  // const chatPartners = await User.find({ _id: { $in: chatPartnerId } }).select(
  //   "-password"
  // );

  //*PERFORMANCE OPTIMIZATION:
  //using mongodb aggregation to find the partner ids from the messages.
  //this avoids heavy memory usage and allows mongodb to manage the data processing.
  //this will return partner ids directly.

  const chatPartnerIds = await Message.aggregate([
    //satage 1: match the messsges where the logged in user is the sender or receiver
    {
      $match: {
        $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
      },
    },
    //stage 2: project a new field 'partnerId' which will contain the id of the other user
    {
      $project: {
        partnerId: {
          //$cond: if-else in aggregation pipeline
          //$cond:[condition, if-true, if-false]
          $cond: [
            { $eq: ["$senderId", loggedInUserId] },
            "$receiverId",
            "$senderId",
          ],
        },
      },
    },
    //stage 3: sorting by last msg time
    {
      $sort: {
        createdAt: -1,
      },
    },
    //stage 4: group by partnerId
    {
      $group: {
        _id: "$partnerId",
      },
    },
  ]);

  //gives a clean resoponse from the aggregation result
  const uniquePartnerIds = chatPartnerIds.map((doc) => doc._id);

  if (uniquePartnerIds.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No chats found"));
  }

  const chatPartners = await User.find({
    _id: { $in: uniquePartnerIds },
  }).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, chatPartners, "Chats fetched successfully!"));
});

export { getAllContacts, getMessagesByUserId, sendMessage, getAllChats };
