 express = require('express');
 bodyParser = require('body-parser');
 cors = require('./cors');

 authenticate = require('../authenticate');
 multer = require('multer');

 storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, 'public/images');
     },

     filename: (req, file, cb) => {
         cb(null, file.originalname)
     }
 });

 imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error('You can upload only image files!'), false);
     }
     cb(null, true);
 };

 upload = multer({ storage: storage, fileFilter: imageFileFilter });

 uploadRouter = express.Router();
 uploadRouter.use(bodyParser.json());

 uploadRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
     .get(cors.cors, authenticate.verifyUser, authenticate.varifyAdmin, (req, res, next) => {
         res.statusCode = 403;
         res.end('GET operation not supported on /imageUpload');
     })
     .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.varifyAdmin, upload.single('imageFile'), (req, res, next) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(req.file);
     })
     .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.varifyAdmin, (req, res, next) => {
         res.statusCode = 403;
         res.end('PUT operation not supported on /imageUpload');
     })
     .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.varifyAdmin, (req, res, next) => {
         res.statusCode = 403;
         res.end('DELETE operation not supported on /imageUpload');
     });

 module.exports = uploadRouter;