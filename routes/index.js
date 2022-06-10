import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { getArticles, getArticlesById, saveArticles, updateArticles, deleteArticles  } from "../controller/ArticlesController.js";
import { getDalang, getDalangById, saveDalang, updateDalang, deleteDalang } from "../controller/DalangController.js";
import { getPlaces, getPlacesById, savePlaces, updatePlaces, deletePlaces } from "../controller/PlacesController.js";
import { getStories, getStoriesById, saveStories, updateStories, deleteStories  } from "../controller/PSController.js";
import { getShop, getShopById, saveShop, updateShop, deleteShop  } from "../controller/ShopController.js";
import { getWayangs, getWayangsById, saveWayangs, updateWayangs, deleteWayangs } from "../controller/WayangsController.js";

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
router.post('/Articles', saveArticles);
router.patch('/Articles/:id', updateArticles);
router.delete('/Articles/:id', deleteArticles);

//Dalang Biography Content
router.get('/Dalang', verifyToken, getDalang);
router.get('/Dalang/:id', verifyToken, getDalangById);
router.post('/Dalang', saveDalang);
router.patch('/Dalang/:id', updateDalang);
router.delete('/Dalang/:id', deleteDalang);

//Place Content
router.get('/Places', verifyToken, getPlaces);
router.get('/Places/:id', verifyToken, getPlacesById);
router.post('/Places', savePlaces);
router.patch('/Places/:id', updatePlaces);
router.delete('/Places/:id', deletePlaces);

//Stories of Puppet Content
router.get('/Stories', verifyToken, getStories);
router.get('/Stories/:id', verifyToken, getStoriesById);
router.post('/Stories', saveStories);
router.patch('/Stories/:id', updateStories);
router.delete('/Stories/:id', deleteStories);

//Shop Content
router.get('/Shop', verifyToken, getShop);
router.get('/Shop/:id', verifyToken, getShopById);
router.post('/Shop', saveShop);
router.patch('/Shop/:id', updateShop);
router.delete('/Shop/:id', deleteShop);

//Wayang Content
router.get('/Wayangs', verifyToken, getWayangs);
router.get('/Wayangs/:id', verifyToken, getWayangsById);
router.post('/Wayangs', saveWayangs);
router.patch('/Wayangs/:id', updateWayangs);
router.delete('/Wayangs/:id', deleteWayangs);

export default router;