import Centres from "../models/Centres.js";
import Slot from "../models/Slots.js";

export const createCentre = async (req, res, next) => {
  const newCentre = new Centres(req.body);

  try {
    const savedCentre = await newCentre.save();
    res.status(200).json(savedCentre);
  } catch (err) {
    next(err);
  }
};
export const updateCentre = async (req, res, next) => {
  try {
    const updatedCentre = await Centres.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCentre);
  } catch (err) {
    next(err);
  }
};
export const deleteCentre = async (req, res, next) => {
  try {
    await Centres.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCentre = async (req, res, next) => {
  try {
    const Centre = await Centres.findById(req.params.id);
    res.status(200).json(Centre);
  } catch (err) {
    next(err);
  }
};
export const getCentres = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const centres = await Centres.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(centres);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const CityList = await Promise.all(
      cities.map((city) => {
        return Centres.countDocuments({ city: city });
      })
    );
    res.status(200).json(CityList);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const freeCentreCount = await Centres.countDocuments({ type: "FREE" });
    const paidCentreCount = await Centres.countDocuments({ type: "PAID" });

    res.status(200).json([
      { type: "FREE", count: freeCentreCount },
      { type: "PAID", count: paidCentreCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getCentreSlots = async (req, res, next) => {
  try {
    const centre = await Centres.findById(req.params.id);
    const list = await Promise.all(
      centre.slots.map((Slots) => {
        return Slot.findById(Slots);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};