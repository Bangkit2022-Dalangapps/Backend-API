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
router.get('/Articles', verifyToken, getArticles);
router.get('/Articles/:id', verifyToken, getArticlesById);
router.post('/Articles', verifyToken, saveArticles);
router.patch('/Articles/:id', verifyToken, updateArticles);
router.delete('/Articles/:id', verifyToken, deleteArticles);

//Dalang Biography Content
router.get('/Dalang', verifyToken, getDalang);
router.get('/Dalang/:id', verifyToken, getDalangById);
router.post('/Dalang', verifyToken,saveDalang);
router.patch('/Dalang/:id', verifyToken,updateDalang);
router.delete('/Dalang/:id', verifyToken,deleteDalang);

//Place Content
router.get('/Places', verifyToken, getPlaces);
router.get('/Places/:id', verifyToken, getPlacesById);
router.post('/Places', verifyToken, savePlaces);
router.patch('/Places/:id', verifyToken, updatePlaces);
router.delete('/Places/:id', verifyToken, deletePlaces);

//Stories of Puppet Content
router.get('/Stories', verifyToken, getStories);
router.get('/Stories/:id', verifyToken, getStoriesById);
router.post('/Stories', verifyToken, saveStories);
router.patch('/Stories/:id', verifyToken, updateStories);
router.delete('/Stories/:id', verifyToken, deleteStories);

//Wayang Content
router.get('/Wayang', verifyToken, getWayang);
router.get('/Wayang/:id', verifyToken, getWayangById);
router.post('/Wayang', verifyToken, saveWayang);
router.patch('/Wayang/:id', verifyToken, updateWayang);
router.delete('/Wayang/:id', verifyToken, deleteWayang);

export default router;