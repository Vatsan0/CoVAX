import express from "express";
import { createCentre, countByCity, countByType, deleteCentre, getCentre, getCentres, updateCentre, getCentreSlots } from "../controllers/centre.js";
import Centres from "../models/Centres.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCentre);

//UPDATE
router.put("/:id", verifyAdmin, updateCentre);
//DELETE
router.delete("/:id", verifyAdmin, deleteCentre);
//GET

router.get("/find/:id", getCentre);
//GET ALL

router.get("/", getCentres);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getCentreSlots);

export default router