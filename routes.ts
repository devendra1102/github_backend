import express, { Router } from 'express';
import repoController from './controllers/repos';

export const router : Router = express.Router();

router.get('/users/:userid/repos', repoController.getRepos);