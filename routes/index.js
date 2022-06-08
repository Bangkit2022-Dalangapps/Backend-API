import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { getArticles, getArticlesById, saveArticles, updateArticles, deleteArticles  } from "../controller/ArticlesController.js";
import { getDalang, getDalangById, saveDalang, updateDalang, deleteDalang } from "../controller/DalangController.js";
import { getPlaces, getPlacesById, savePlaces, updatePlaces, deletePlaces } from "../controller/PlacesController.js";
import { getStories, getStoriesById, saveStories, updateStories, deleteStories  } from "../controller/PSController.js";
import { getWayang, getWayangById, saveWayang, updateWayang, deleteWayang } from "../controller/WayangController.js";

const router = express.Router();

//AUTH Login Register
router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

//Article Content
router.get('/Articles', getArticles);
router.get('/Articles/:id', getArticlesById);
router.post('/Articles', saveArticles);
router.patch('/Articles/:id', updateArticles);
router.delete('/Articles/:id', deleteArticles);

//Dalang Biography Content
router.get('/Dalang', getDalang);
router.get('/Dalang/:id', getDalangById);
router.post('/Dalang', saveDalang);
router.patch('/Dalang/:id', updateDalang);
router.delete('/Dalang/:id', deleteDalang);

//Place Content
router.get('/Places', getPlaces);
router.get('/Places/:id', getPlacesById);
router.post('/Places', savePlaces);
router.patch('/Places/:id', updatePlaces);
router.delete('/Places/:id', deletePlaces);

//Stories of Puppet Content
router.get('/Stories', getStories);
router.get('/Stories/:id', getStoriesById);
router.post('/Stories', saveStories);
router.patch('/Stories/:id', updateStories);
router.delete('/Stories/:id', deleteStories);

//Wayang Content
router.get('/Wayang', getWayang);
router.get('/Wayang/:id', getWayangById);
router.post('/Wayang', saveWayang);
router.patch('/Wayang/:id', updateWayang);
router.delete('/Wayang/:id', deleteWayang);

export default router;