import Slot from "../models/Slots.js";
import Centres from "../models/Centres.js";
import { createError } from "../utils/error.js";

export const createSlot = async (req, res, next) => {
  const centreId = req.params.centreid;
  const newSlot = new Slot(req.body);

  try {
    const savedSlot = await newSlot.save();
    try {
      await Centres.findByIdAndUpdate(centreId, {
        $push: { rooms: savedSlot._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSlot);
  } catch (err) {
    next(err);
  }
};

export const updateSlot = async (req, res, next) => {
  try {
    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSlot);
  } catch (err) {
    next(err);
  }
};
export const updateSlotAvailability = async (req, res, next) => {
  try {
    await Slot.updateOne(
      { "SlotNumbers._id": req.params.id },
      {
        $push: {
          "SlotNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Slot status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteSlot = async (req, res, next) => {
  const centreId = req.params.centreid;
  try {
    await Slot.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(centreId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Slot has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getSlot = async (req, res, next) => {
  try {
    const room = await Slot.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getSlots = async (req, res, next) => {
  try {
    const rooms = await Slot.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};