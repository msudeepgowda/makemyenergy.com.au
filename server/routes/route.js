const express = require("express");
const multer = require("multer");
const router = express.Router();
const nodemailer = require('nodemailer');
const batteryModel = require('../models/batteryModel')
const Panels = require('../models/panels')
const inverters = require('../models/inverters')
const inverter_single = require('../models/inverter_single')
const inverter_hybrid_single = require('../models/inverter_hybrid_single')
const inverter_three = require('../models/inverter_three')
const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const orderModelOptimized = require('../models/orderModelOptimized')
const imageRepoModel = require('../models/imageRepoModel')
const certRepoModel = require('../models/certRepoModel')
const chargerModel = require('../models/chargerModel')
const optimizerModel = require('../models/optimizerModel')
const compatibleBatteryModel = require('../models/compatibleBatteryModel')
const stateRebate = require('../models/stateRebate')
const zipZoneRatingModel = require('../models/zipZoneRatingModel')
const STCModel = require('../models/STCModel')

require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const storage = multer.memoryStorage()
const upload = multer({ storage })
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client(
    {
        region: "us-west-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

const S3_BUCKET = process.env.BUCKET;

const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
});

function verifyUserToken(req, res, next) {
    const token = req.cookies.LOGIN_INFO;
    if (token === null) {
        return res.status(401).send('Access denied, No Token provided');
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            if (decodedToken.email === req.params.userId.toString()) {
                req.user = decodedToken.email
                next();
            } else {
                return res.status(401).send('Invalid token');
            }
        } catch (error) {
            return res.status(401).send('Invalid token');
        }
    }
}

function verifyAdminToken(req, res, next) {
    const token = req.cookies.ADM_LOGIN_INFO;
    if (token === null) {
        return res.status(401).send('Access denied, No Token provided');
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
            if (decodedToken.email === req.headers['admin-email'].toString()) {
                req.admin = decodedToken.email
                next();
            } else {
                return res.status(401).send('Invalid token');
            }
        } catch (error) {
            return res.status(401).send('Invalid token');
        }
    }
}

// Get all details by products
router.get('/productBrandImg/:product', async (req, res) => {
    const product = req.params.product.toString().toLowerCase()
    let prod_list = "Invalid Product"
    try {
        if (product == "panel") {
            prod_list = await Panels.aggregate([{ "$match": { "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "inverter") {
            prod_list = await inverters.aggregate([{ "$match": { "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "battery") {
            prod_list = await batteryModel.aggregate([{ "$match": { "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "charger") {
            prod_list = await chargerModel.aggregate([{ "$match": { "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "optimizer") {
            prod_list = await optimizerModel.aggregate([{ "$match": { "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        }
        else if (product == "hybrid_inverter") {
            prod_list = await inverters.aggregate([{ "$match": { model: "hybrid", "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "single_inverter") {
            prod_list = await inverters.aggregate([{ "$match": { model: "single phase", "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        } else if (product == "three_inverter") {
            prod_list = await inverters.aggregate([{ "$match": { model: "three phase", "status": "active" } }, { "$group": { "_id": { brand: "$brand", logo_image_url: "$logo_image_url" } } }])
        }
        res.json(prod_list)
        console.log(prod_list)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting products by Brand
router.get('/productByBrand/:product/:brand', async (req, res) => {
    const product = req.params.product.toString().toLowerCase()
    let prod_list = "Invalid Product"
    try {
        if (product == "panel") {
            prod_list = await Panels.find({ "brand": req.params.brand, "status": "active" })
        } else if (product == "inverter") {
            prod_list = await inverters.find({ "brand": req.params.brand, "status": "active" })
        } else if (product == "battery") {
            prod_list = await batteryModel.find({ "brand": req.params.brand, "status": "active" })
        } else if (product == "charger") {
            prod_list = await chargerModel.find({ "brand": req.params.brand, "status": "active" })
        } else if (product == "optimizer") {
            prod_list = await optimizerModel.find({ "brand": req.params.brand, "status": "active" })
        }
        else if (product == "hybrid_inverter") {
            prod_list = await inverters.find({ "brand": req.params.brand, "model": "hybrid", "status": "active" })
        } else if (product == "single_inverter") {
            prod_list = await inverters.find({ "brand": req.params.brand, "model": "single phase", "status": "active" })
        } else if (product == "three_inverter") {
            prod_list = await inverters.find({ "brand": req.params.brand, "model": "three phase", "status": "active" })
        }
        res.json(prod_list)
        console.log(prod_list)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all products for admin
router.get('/getproducts/:product', async (req, res) => {
    const product = req.params.product.toString().toLowerCase()
    let prod_list = "Invalid Product"
    try {
        if (product == "panel") {
            prod_list = await Panels.find()
        } else if (product == "inverter") {
            prod_list = await inverters.find()
        } else if (product == "battery") {
            prod_list = await batteryModel.find()
        } else if (product == "charger") {
            prod_list = await chargerModel.find()
        } else if (product == "optimizer") {
            prod_list = await optimizerModel.find()
        }
        else if (product == "hybrid_inverter") {
            prod_list = await inverters.find({ "model": "hybrid" })
        } else if (product == "single_inverter") {
            prod_list = await inverters.find({ "model": "single phase" })
        } else if (product == "three_inverter") {
            prod_list = await inverters.find({ "model": "three phase" })
        }
        res.json(prod_list)
        console.log(prod_list)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all compatible battries
router.get('/compatibleBatteryBrandImg/:inverter', async (req, res) => {
    // const inverter = req.params.inverter.toString()
    let battery_id_list = []
    try {
        const compatibleBattery = await compatibleBatteryModel.find({ "inverter_brand": req.params.inverter.toString() }, 'compatible_batteries.battery_id compatible_batteries.chareger_req_ind')
        let i = 0

        console.log(compatibleBattery[0].compatible_batteries[0].battery_id)
        for (let i = 0; i < compatibleBattery[0].compatible_batteries.length; i++) {
            battery_id_list[i] = compatibleBattery[0].compatible_batteries[i].battery_id.toString()
        }
        console.log("Printing battery array")
        console.log(battery_id_list)
        let battery = await batteryModel.find({ "_id": { $in: battery_id_list } })
        // console.log(compatibleBattery[0].compatible_batteries[1])
        for (let i = 0; i < compatibleBattery[0].compatible_batteries.length; i++) {
            battery[i]["chareger_req_ind"] = compatibleBattery[0].compatible_batteries[i].chareger_req_ind
            console.log("Printing Battery " + battery[i])
        }

        res.json(battery)
        console.log(battery)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Add Product 
router.post('/addProduct/:product', upload.any(), async (req, res) => {

    const product = req.params.product.toString().toLowerCase()

    let prod_list;
    let productImageUrl = "";
    let productPdfUrl = "";
    let productImage;
    let productPdf;

    if (req.files !== null && req.files !== undefined) {
        productImage = req.files.find(file => file.fieldname === "product_image_url");
        productPdf = req.files.find(file => file.fieldname === "product_pdf");
    }

    if (productImage !== null && productImage !== undefined) {
        const productImageParams = {
            Bucket: S3_BUCKET,
            Key: `products/${productImage.originalname}`,
            Body: productImage.buffer,
            ContentType: productImage.mimetype
        };

        const data = await s3.send(new PutObjectCommand(productImageParams));
        if (data.$metadata.httpStatusCode === 200) {
            productImageUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${productImageParams.Key}`
        }
    }

    if (productPdf !== null && productPdf !== undefined) {
        const productPdfParams = {
            Bucket: S3_BUCKET,
            Key: `productPDF/${productPdf.originalname}`,
            Body: productPdf.buffer,
            ContentType: productPdf.mimetype,
        };

        const data = await s3.send(new PutObjectCommand(productPdfParams));
        if (data.$metadata.httpStatusCode === 200) {
            productPdfUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${productPdfParams.Key}`
        }
    }

    try {
        if (product == "panel") {
            prod_list = new Panels({
                brand: req.body.brand,
                model: req.body.model,
                size: req.body.size,
                // no_of_panels: req.body.no_of_panels,
                price: req.body.price,
                logo_image_url: req.body.logo_image_url,
                product_image_url: productImageUrl,
                status: "active",
                product_desc: req.body.product_desc,
                prod_warranty: req.body.prod_warranty,
                efficiancy_warranty: req.body.efficiancy_warranty,
                pdf_url: productPdfUrl
            });
        } else if (product == "inverter") {
            prod_list = new inverters({
                brand: req.body.brand,
                model: req.body.model,
                size: req.body.size,
                price: req.body.price,
                logo_image_url: req.body.logo_image_url,
                product_image_url: productImageUrl,
                status: "active",
                product_desc: req.body.product_desc,
                prod_warranty: req.body.prod_warranty,
                efficiancy_warranty: req.body.efficiancy_warranty,
                pdf_url: productPdfUrl
            });
        } else if (product == "battery") {
            prod_list = new batteryModel({
                brand: req.body.brand,
                model: req.body.model,
                with_eps: req.body.with_eps,
                without_eps: req.body.without_eps,
                logo_image_url: req.body.logo_image_url,
                product_image_url: productImageUrl,
                status: "active",
                product_desc: req.body.product_desc,
                prod_warranty: req.body.prod_warranty,
                efficiancy_warranty: req.body.efficiancy_warranty,
                pdf_url: productPdfUrl,
                min: req.body.min,
                max: req.body.max
            });
        } else if (product == "charger") {
            prod_list = new chargerModel({
                brand: req.body.brand,
                model: req.body.model,
                size: req.body.size,
                price: req.body.price,
                logo_image_url: req.body.logo_image_url,
                product_image_url: productImageUrl,
                status: "active",
                product_desc: req.body.product_desc,
                prod_warranty: req.body.prod_warranty,
                efficiancy_warranty: req.body.efficiancy_warranty,
                pdf_url: productPdfUrl
            });
        } else if (product == "optimizer") {
            prod_list = new optimizerModel({
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                logo_image_url: req.body.logo_image_url,
                product_image_url: productImageUrl,
                status: "active",
                product_desc: req.body.product_desc,
                prod_warranty: req.body.prod_warranty,
                efficiancy_warranty: req.body.efficiancy_warranty,
                pdf_url: productPdfUrl
            });
        }
        prod_list.save((err, doc) => {
            if (!err) {
                console.log("Product added successfully")
                res.status(201).send("Product added successfully")
            }
            else {
                console.log('Error during record insertion : ' + err);
                res.status(500).json({ message: err.message })
            }
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Submit Query 
router.post('/submitQuery', async (req, res) => {

    const mailOptions = {
        from: process.env.GMAIL,
        to: 'hello@makemyenergy.com.au',
        subject: req.body.mailSubject,
        text: req.body.mailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Query Successfully Submitted").status(200);
        }
    });

})

// Getting all batteries 
router.get('/battery', async (req, res) => {
    try {
        const battery = await batteryModel.find()
        res.json(battery)
        console.log("Test msg")
        console.log(battery)
        console.log("Test msg 2")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})


//S3 Bucket
router.post("/wallPosition/:imageType/:value/:userId", verifyUserToken, async (req, res) => {

    const imageType = req.params.imageType.toString()
    const userEmail = req.params.userId.toString()
    try {
        let userDetails = "Invalid User"
        const user = await userModel.find({ "_id": userEmail })
        if (imageType == "meterboard") {
            userDetails = new userModel({
                _id: user[0]["_id"],
                first_name: user[0]["first_name"],
                last_name: user[0]["last_name"],
                email: user[0]["email"],
                phone: user[0]["phone"],
                address: user[0]["address"],
                suburb: user[0]["suburb"],
                state: user[0]["state"],
                zip: user[0]["zip"],
                password: user[0]["password"],
                user_type: user[0]["user_type"],
                meter_standing_pos: req.params.value.toString()
            });
        } else if (imageType == "inverter") {
            userDetails = new userModel({
                _id: user[0]["_id"],
                first_name: user[0]["first_name"],
                last_name: user[0]["last_name"],
                email: user[0]["email"],
                phone: user[0]["phone"],
                address: user[0]["address"],
                suburb: user[0]["suburb"],
                state: user[0]["state"],
                zip: user[0]["zip"],
                password: user[0]["password"],
                user_type: user[0]["user_type"],
                inverter_standing_pos: req.params.value.toString()
            });
        }
        console.log("Saving to mongo")
        userDetails.isNew = false;
        userDetails.save((err, doc) => {
            if (!err) {
                console.log("Wall Location Updated")
                res.status(201).send("Wall Location Updated")
            }
            else {
                console.log('Error during record insertion : ' + err);
                res.status(500).json({ message: err.message })
            }
        });
    } catch (err) {
        console.log("Error", err);
        res.status(500).send(err);
    }
})


//S3 Bucket
router.post("/uploadImage/:imageType/:userId", verifyUserToken, upload.single("image"), async (req, res) => {

    const imageType = req.params.imageType.toString();
    const userEmail = req.params.userId.toString();
    const { file } = req;
    const params = {
        Bucket: S3_BUCKET,
        Key: `user_Home_Images/${userEmail}/${uuidv4()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    try {
        const data = await s3.send(new PutObjectCommand(params));
        if (data.$metadata.httpStatusCode === 200) {
            const objectUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${params.Key}`
            let userDetails = "Invalid User"
            const user = await userModel.find({ "_id": userEmail })
            if (imageType == "electricity_bill_url") {
                userDetails = new userModel({
                    _id: user[0]["_id"],
                    first_name: user[0]["first_name"],
                    last_name: user[0]["last_name"],
                    email: user[0]["email"],
                    phone: user[0]["phone"],
                    address: user[0]["address"],
                    suburb: user[0]["suburb"],
                    state: user[0]["state"],
                    zip: user[0]["zip"],
                    password: user[0]["password"],
                    user_type: user[0]["user_type"],
                    electricity_bill_url: objectUrl
                });
            } else if (imageType == "meterboard_url") {
                userDetails = new userModel({
                    _id: user[0]["_id"],
                    first_name: user[0]["first_name"],
                    last_name: user[0]["last_name"],
                    email: user[0]["email"],
                    phone: user[0]["phone"],
                    address: user[0]["address"],
                    suburb: user[0]["suburb"],
                    state: user[0]["state"],
                    zip: user[0]["zip"],
                    password: user[0]["password"],
                    user_type: user[0]["user_type"],
                    meterboard_url: objectUrl
                });
            } else if (imageType == "inverter_url") {
                userDetails = new userModel({
                    _id: user[0]["_id"],
                    first_name: user[0]["first_name"],
                    last_name: user[0]["last_name"],
                    email: user[0]["email"],
                    phone: user[0]["phone"],
                    address: user[0]["address"],
                    suburb: user[0]["suburb"],
                    state: user[0]["state"],
                    zip: user[0]["zip"],
                    password: user[0]["password"],
                    user_type: user[0]["user_type"],
                    inverter_url: objectUrl
                });
            } else if (imageType == "roof_url") {
                userDetails = new userModel({
                    _id: user[0]["_id"],
                    first_name: user[0]["first_name"],
                    last_name: user[0]["last_name"],
                    email: user[0]["email"],
                    phone: user[0]["phone"],
                    address: user[0]["address"],
                    suburb: user[0]["suburb"],
                    state: user[0]["state"],
                    zip: user[0]["zip"],
                    password: user[0]["password"],
                    user_type: user[0]["user_type"],
                    roof_url: objectUrl
                });
            }
            console.log("Saving to mongo")
            userDetails.isNew = false;
            userDetails.save((err, doc) => {
                if (!err) {
                    console.log("Product added successfully")
                    res.status(201).send(objectUrl)
                }
                else {
                    console.log('Error during record insertion : ' + err);
                    res.status(500).json({ message: err.message })
                }
            });
        }
        else {
            res.status(400).send("Image Not Uploaded")
        }
    } catch (err) {
        console.log("Error", err);
        res.status(500).send(err);
    }
})

// Updatting battery
router.post('/updateProduct/:product', upload.array(), async (req, res) => {

    const product = req.params.product.toString().toLowerCase()

    let prod_list;
    let productImageUrl = "";
    let productPdfUrl = "";
    let productImage;
    let productPdf;

    if (req.files !== null && req.files !== undefined) {
        productImage = req.files.find(file => file.fieldname === "product_image_url");
        productPdf = req.files.find(file => file.fieldname === "product_pdf");
    }

    if (productImage !== null && productImage !== undefined) {
        const productImageParams = {
            Bucket: S3_BUCKET,
            Key: `products/${productImage.originalname}`,
            Body: productImage.buffer,
            ContentType: productImage.mimetype
        };

        const data = await s3.send(new PutObjectCommand(productImageParams));
        if (data.$metadata.httpStatusCode === 200) {
            productImageUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${productImageParams.Key}`
        }
    } else {
        productImageUrl = req.body.product_image_url
    }

    if (productPdf !== null && productPdf !== undefined) {
        const productPdfParams = {
            Bucket: S3_BUCKET,
            Key: `productPDF/${productPdf.originalname}`,
            Body: productPdf.buffer,
            ContentType: productPdf.mimetype,
        };

        const data = await s3.send(new PutObjectCommand(productPdfParams));
        if (data.$metadata.httpStatusCode === 200) {
            productPdfUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${productPdfParams.Key}`
        }
    } else {
        productPdfUrl = req.body.pdf_url
    }
    console.log("printing data ", req.body)
    try {
        if (product == "panel") {
            console.log("Printing Size element " + req.body.size[1])
            console.log("Printing Type of Size element " + typeof (req.body.size))
            prod_list = await Panels.updateOne({ "_id": req.body.id }, {
                $set: {
                    "brand": req.body.brand,
                    "model": req.body.model,
                    "size": req.body.size,
                    "price": req.body.price,
                    "no_of_panels": req.body.no_of_panels,
                    "logo_image_url": req.body.logo_image_url,
                    "product_image_url": productImageUrl,
                    "status": req.body.status,
                    "product_desc": req.body.product_desc,
                    "prod_warranty": req.body.prod_warranty,
                    "efficiancy_warranty": req.body.efficiancy_warranty,
                    "pdf_url": productPdfUrl
                }
            });
        } else if (product == "inverter") {
            prod_list = await inverters.updateOne({ "_id": req.body.id }, {
                $set: {
                    "brand": req.body.brand,
                    "model": req.body.model,
                    "size": req.body.size,
                    "price": req.body.price,
                    "logo_image_url": req.body.logo_image_url,
                    "product_image_url": productImageUrl,
                    "status": req.body.status,
                    "product_desc": req.body.product_desc,
                    "prod_warranty": req.body.prod_warranty,
                    "efficiancy_warranty": req.body.efficiancy_warranty,
                    "pdf_url": productPdfUrl
                }
            });
        } else if (product == "battery") {
            prod_list = await batteryModel.updateOne({ "_id": req.body.id }, {
                $set: {
                    "brand": req.body.brand,
                    "model": req.body.model,
                    "with_eps": req.body.with_eps,
                    "without_eps": req.body.without_eps,
                    "logo_image_url": req.body.logo_image_url,
                    "product_image_url": productImageUrl,
                    "status": req.body.status,
                    "product_desc": req.body.product_desc,
                    "prod_warranty": req.body.prod_warranty,
                    "efficiancy_warranty": req.body.efficiancy_warranty,
                    "pdf_url": productPdfUrl,
                    "min": req.body.min,
                    "max": req.body.max
                }
            });
        } else if (product == "charger") {
            prod_list = await chargerModel.updateOne({ "_id": req.body.id }, {
                $set: {
                    "brand": req.body.brand,
                    "model": req.body.model,
                    "size": req.body.size,
                    "price": req.body.price,
                    "phase": req.body.phase,
                    "logo_image_url": req.body.logo_image_url,
                    "product_image_url": productImageUrl,
                    "status": req.body.status,
                    "product_desc": req.body.product_desc,
                    "prod_warranty": req.body.prod_warranty,
                    "efficiancy_warranty": req.body.efficiancy_warranty,
                    "pdf_url": productPdfUrl
                }
            });
        } else if (product == "optimizer") {
            prod_list = await optimizerModel.updateOne({ "_id": req.body.id }, {
                $set: {
                    "brand": req.body.brand,
                    "model": req.body.model,
                    "price": req.body.price,
                    "logo_image_url": req.body.logo_image_url,
                    "product_image_url": productImageUrl,
                    "status": req.body.status,
                    "product_desc": req.body.product_desc,
                    "prod_warranty": req.body.prod_warranty,
                    "efficiancy_warranty": req.body.efficiancy_warranty,
                    "pdf_url": productPdfUrl
                }
            });
        }

        // const query = [{"brand":"Jinko"},{$set:{req.body.key : req.body.value}}]
        // const battery = await batteryModel.updateMany({ "_id": req.body.id }, { $set: { "brand": req.body.value } })
        res.json(prod_list)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting Panels post size
router.get('/panelsWithSize/:size', async (req, res) => {
    console.log("Inside product route with type param: ")
    const recommendedSize = req.params.size.toString()
    const regex = /\d+/g;
    const matches = recommendedSize.match(regex);
    console.log("Printing Integers" + matches)
    try {
        const panels = await Panels.find()
        res.json(panels)
        // console.log(panels)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting All Panels
router.get('/panels', async (req, res) => {
    console.log("Inside product route with type param: ")
    try {
        const panels = await Panels.find()
        res.json(panels)
        console.log(panels)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting All invertors
router.get('/inverters', async (req, res) => {
    // const prodType = req.params.type
    console.log("Inside inverters: ")
    try {
        const Inverters = await inverters.find()
        res.json(Inverters)
        console.log(Inverters)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting All single invertor
router.get('/inverterSingle', async (req, res) => {
    // const prodType = req.params.type
    console.log("Inside product route with type param: ")
    try {
        const inverterSingle = await inverter_single.find()
        res.json(inverterSingle)
        console.log(inverterSingle)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting All hybrid single invertor
router.get('/inverterHybridSingle', async (req, res) => {

    // const prodType = req.params.type
    console.log("Inside product route with type param: ")
    try {
        const inverterHybridSingle = await inverter_hybrid_single.find()
        res.status(200).json(inverterHybridSingle)
        console.log(inverterHybridSingle)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Getting All three phase invertor
router.get('/inverterThree', async (req, res) => {

    // const prodType = req.params.type
    console.log("Inside product route with type param: ")
    try {
        const inverterThree = await inverter_three.find()
        res.json(inverterThree)
        console.log(inverterThree)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

router.post('/signin', async (req, res) => {
    try {
        userModel.findOne({ email: req.body.email, user_type: 'user' }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "Invalid User Credentials" });
            }
            const validPasswdCheck = bcrypt.compareSync(req.body.password, user.password);
            if (!validPasswdCheck) {
                console.log("Invalid Credentials")
                return res.status(401).send({ message: "Invalid User Credentials" });
            }
            if (user && validPasswdCheck) {
                const jwtToken = jwt.sign(
                    {
                        email: req.body.email
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '21d'
                    }
                );
                res.cookie("LOGIN_INFO", jwtToken, {
                    expires: new Date(Date.now() + 1814400000),
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    domain: ".makemyenergy.com.au",
                    path: '/',
                }).send("Authentication Successful").status(200);
            }
        })
    } catch (err) {
        res.json("User not found")
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

router.post("/forgotPassword", async (req, res) => {
    try {
        userModel.findOne({ email: req.body.email, user_type: 'user' }).exec((err, user) => {
            if (err) {
                return res.send("User not found").status(500);
            }

            if (!user) {
                return res.send("User not found").status(500);
            }

            if (user.password !== null) {
                const secret = process.env.SECRET_KEY + user.password;
                const jwtToken = jwt.sign(
                    {
                        email: req.body.email,
                        id: user.first_name
                    },
                    secret,
                    {
                        expiresIn: '15m'
                    }
                );

                const link = `https://www.makemyenergy.com.au/resetpassword/${req.body.email}/${jwtToken}`

                const mailOptions = {
                    from: process.env.GMAIL,
                    to: req.body.email,
                    subject: "Reset Password",
                    text: `Click the link below to reset your password:\n\n ${link} \n The Link is only valid for 15 minutes`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.send("Error while sending mail").status(500);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send("A Reset Link has be sent to your email address").status(200);
                    }
                });
            }
        })
    } catch (err) {
        res.status(500).send("User not found");
    }
})

router.post("/resetpassword", async (req, res, next) => {
    const { email, token } = req.body;
    if (token === null || email === null) {
        return res.status(401).send('Access denied, No Token provided');
    } else {
        try {
            userModel.findOne({ email: email, user_type: 'user' }).exec((err, user) => {
                if (err) {
                    return res.send("Invalid User").status(500);
                }

                if (!user) {
                    return res.send("Invalid User").status(500);
                }

                if (user.password !== null) {
                    const secret = process.env.SECRET_KEY + user.password;
                    try {
                        const decodedToken = jwt.verify(token, secret);
                        if (decodedToken.email === email) {
                            return res.send(decodedToken.email).status(200);
                        } else {
                            return res.status(401).send('Invalid token');
                        }
                    } catch (error) {
                        if (error instanceof jwt.TokenExpiredError) {
                            return res.status(401).send('Token expired');
                        } else {
                            return res.status(401).send('Invalid token');
                        }
                    }
                }
            })
        } catch (error) {
            return res.status(401).send('Invalid token');
        }
    }
})

// Admin Signin
router.post('/adminSignin', async (req, res) => {
    try {
        userModel.findOne({ email: req.body.email, user_type: 'admin' }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "Invalid User Credentials" });
            }
            const validPasswdCheck = bcrypt.compareSync(req.body.password, user.password);
            if (!validPasswdCheck) {
                console.log("Invalid Credentials")
                return res.status(401).send({ message: "Invalid User Credentials" });
            }
            if (user && validPasswdCheck) {
                const jwtToken = jwt.sign(
                    {
                        email: req.body.email
                    },
                    process.env.ADMIN_SECRET_KEY,
                    {
                        expiresIn: '21d'
                    }
                );
                res.cookie("ADM_LOGIN_INFO", jwtToken, {
                    expires: new Date(Date.now() + 1814400000),
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    domain: ".makemyenergy.com.au",
                    path: '/',
                }).send("Authentication Successful").status(200);
            }
        })
    } catch (err) {
        res.json("User not found")
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("LOGIN_INFO", {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'none',
            domain: ".makemyenergy.com.au",
        }).send("Logout Successful").status(200)
    } catch (error) {
        console.log(error)
    }
})

router.get("/adminLogout", (req, res) => {
    try {
        res.clearCookie("ADM_LOGIN_INFO", {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'none',
            domain: ".makemyenergy.com.au",
        }).send("Logout Successful").status(200)
    } catch (error) {
        console.log(error)
    }
})

router.get('/recommendedSys/:bill', async (req, res) => {
    const quartBill = req.params.bill
    console.log("Inside Recommended System point")
    if (quartBill >= 300 && quartBill <= 400) {
        res.json({ "panel_size": "5KW", "inverter_size": "5KW" })
    } else if (quartBill >= 401 && quartBill <= 600) {
        res.json({ "panel_size": "6.6KW", "inverter_size": "5KW" })
    } else if (quartBill >= 601 && quartBill <= 750) {
        res.json({ "panel_size": "8KW", "inverter_size": "8KW" })
    } else if (quartBill > 750) {
        res.json({ "panel_size": "9.9KW", "inverter_size": "8KW" })
    }
})

router.get('/certRepo', async (req, res) => {

    try {
        const CertRepoModel = await certRepoModel.find()
        res.json(CertRepoModel)
        console.log(CertRepoModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

router.post('/updateCertRepo', upload.single("pdf"), async (req, res) => {

    const { file } = req;
    const params = {
        Bucket: S3_BUCKET,
        Key: `certificate/${uuidv4()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    try {
        const data = await s3.send(new PutObjectCommand(params));
        if (data.$metadata.httpStatusCode === 200) {
            const objectUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${params.Key}`

            const CertRepoModelResp = await certRepoModel.updateOne({ "_id": req.body.id }, { $set: { "brand": "certificate", "cert_url": objectUrl } })
            res.json(CertRepoModelResp)
            console.log(CertRepoModelResp)
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Update User Progress URL
router.post('/updateUserProgressUrl', async (req, res) => {
    try {
        const userModelResp = await userModel.updateOne({ "_id": req.body.id }, { $set: { "progress_url": req.body.progress_url } })
        res.status(201).send("Proposal Url Added Successfully")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all brands
router.get('/imageRepo', async (req, res) => {

    console.log("Inside image Repo: ")
    try {
        const ImageRepoModel = await imageRepoModel.find()
        res.json(ImageRepoModel)
        console.log(ImageRepoModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Update brand
router.post('/updateImageRepo', upload.single("logo_image_url"), async (req, res) => {

    console.log("Inside image Repo: ")

    const { file } = req;
    const params = {
        Bucket: S3_BUCKET,
        Key: `logos/${uuidv4()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    const data = await s3.send(new PutObjectCommand(params));
    if (data.$metadata.httpStatusCode === 200) {
        const objectUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${params.Key}`
        const imageRepoModelDetails = new imageRepoModel({
            brand: req.body.brand,
            logo_image_url: objectUrl
        });

        try {
            const ImageRepoModelResp = await imageRepoModel.updateOne({ "_id": req.body.id }, { $set: { "brand": req.body.brand, "logo_image_url": objectUrl } })
            res.json(ImageRepoModelResp)
            console.log(ImageRepoModelResp)
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message })
        }
    }


})

// Submit Order
router.post('/submitOrder/:userId', verifyUserToken, async (req, res) => {
    let orderDetails = new orderModel({
        state: req.body.state,
        bill: req.body.bill,
        zip: req.body.zip,
        property_type: req.body.property_type,
        floor_type: req.body.floor_type,
        roof_type: req.body.roof_type,
        roof_material: req.body.roof_material,
        meter_type: req.body.meter_type,
        panel_existance_status: req.body.panel_existance_status,
        panel_id: req.body.panel_id,
        panel_brand: req.body.panel_brand,
        panel_model: req.body.panel_model,
        panel_size: req.body.panel_size,
        panel_number: req.body.panel_number,
        panel_price: req.body.panel_price,
        inverter_id: req.body.inverter_id,
        inverter_brand: req.body.inverter_brand,
        inverter_model: req.body.inverter_model,
        inverter_size: req.body.inverter_size,
        inverter_price: req.body.inverter_price,
        battery_id: req.body.battery_id,
        battery_brand: req.body.battery_brand,
        battery_model: req.body.battery_model,
        battery_epsFlag: req.body.battery_epsFlag,
        battery_price: req.body.battery_price,
        additional_prod: req.body.additional_prod,
        ev_charger_id: req.body.ev_charger_id,
        ev_charger_brand: req.body.ev_charger_brand,
        ev_charger_model: req.body.ev_charger_model,
        ev_charger_phase: req.body.ev_charger_phase,
        ev_charger_size: req.body.ev_charger_size,
        ev_charger_price: req.body.ev_charger_price,
        optimizer_id: req.body.optimizer_id,
        optimizer_brand: req.body.optimizer_brand,
        optimizer_model: req.body.optimizer_model,
        optimizer_price: req.body.optimizer_price,
        stc: req.body.stc,
        rebate: req.body.rebate,
        additional_cost: req.body.additional_cost,
        total_price: req.body.total_price,
        orderType: req.body.orderType,
        user_id: req.body.user_id,
        order_date_time: Date.now()
    });

    orderDetails.save((err, doc) => {
        if (!err) {
            console.log("Order added successfully")
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.GMAIL,
                to: 'hello@makemyenergy.com.au',
                subject: "Order submitted by " + req.body.user_id,
                text: "An order has been submitted as \n" + doc
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    userModel.updateOne(
                        { _id: req.body.user_id },
                        { $push: { orders: doc._id } },
                        function (error, success) {
                            if (error) {
                                res.status(500).json({ message: err.message })
                                console.log(error);
                            } else {
                                res.status(201).send("Order added Successfully")
                                console.log(success);
                            }
                        }
                    )
                    // res.send(" Submitted").status(200);
                }
            });

            // res.status(201).send("Order added successfully")
        }
        else {
            console.log('Error during record insertion : ' + err);
            res.status(500).json({ message: err.message })
        }
    });
})

// Get all orders
router.get('/getAllOrders', async (req, res) => {

    try {
        const orderModelResp = await orderModel.find()
        res.json(orderModelResp)
        console.log(orderModelResp)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all orders by user
router.get('/getOrdersById/:userID', async (req, res) => {

    try {
        const orderModelResp = await orderModel.find({ "user_id": req.params.userID })
        res.json(orderModelResp)
        console.log(orderModelResp)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all orders by order Type
router.get('/getOrdersByType/:orderType', async (req, res) => {

    try {
        const orderModelResp = await orderModel.find({ "orderType": req.params.orderType })
        res.json(orderModelResp)
        console.log(orderModelResp)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Submit Order 2 
router.post('/submitOrderReq/:userId', verifyUserToken, async (req, res) => {
    console.log("Endpoint hitting")
    let orderDetails = new orderModelOptimized({
        state: req.body.state,
        bill: req.body.bill,   // Customer Quarterly bill
        zip: req.body.zip,
        property_type: req.body.property_type,
        floor_type: req.body.floor_type,
        roof_type: req.body.roof_type,
        roof_material: req.body.roof_material,
        meter_type: req.body.meter_type,
        panel_existance_status: req.body.panel_existance_status,
        panel_size: req.body.panel_size,
        inverter_size: req.body.inverter_size,
        panel_id: req.body.panel_id,
        inverter_id: req.body.inverter_id,
        battery_id: req.body.battery_id,
        eps_info: req.body.eps_info,
        hybrid_inverter_id: req.body.hybrid_inverter_id,
        battery_charger_ind: req.body.battery_charger_ind, // Value in Yes or No
        optimizer_id: req.body.optimizer_id,
        EV_charger_id: req.body.EV_charger_id,
        total_price: req.body.total_price,
        orderType: req.body.orderType,  // Contains Value as "SystemDesign" or "Panel" or "Inverter" etc
        user_id: req.body.user_id,
        order_date_time: Date.now() // Current System Date and time
    });
    console.log("Endpoint hitting")
    orderDetails.save((err, doc) => {
        if (!err) {
            console.log("Order added successfully")
            res.status(201).send("Order added successfully")
        }
        else {
            console.log('Error during record insertion : ' + err);
            res.status(500).json({ message: err.message })
        }
    });
})

// Getting all User's Order

router.get('/getOrder/:userId/:orderType', async (req, res) => {


    try {
        let orders = await orderModel.find({ "user_id": req.params.userId.toString(), "orderType": req.params.orderType.toString() }).sort({ "order_date_time": -1 }).limit(1)
        let panel
        let inverter
        let battery
        let charger
        let optimizer
        let obj = {}
        console.log("Printing Order " + orders)
        // JSON.parse(JSON.stringify(orders[0])).push(JSON.parse(JSON.stringify(panel[0]))).push(JSON.parse(JSON.stringify(inverter[0]))).push(JSON.parse(JSON.stringify(battery[0]))).push(JSON.parse(JSON.stringify(charger[0]))).push(JSON.parse(JSON.stringify(optimizer[0])))
        // for (const element of orders) {

        //     if (element.orderType == "Panel") {
        //         console.log("Inside panel")
        //         panel = await Panels.find({ "_id": element.panel_id }).select("brand model")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(panel[0])))
        //     } else if (element.orderType == "Inverter") {
        //         console.log("Inside inverter")
        //         inverter = await inverters.find({ "_id": element.inverter_id }).select("brand model")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(inverter[0])))
        //     } else if (element.orderType == "Optimizer") {
        //         console.log("Inside Optimizer")
        //         optimizer = await optimizerModel.find({ "_id": element.optimizer_id }).select("brand model")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(optimizer[0])))
        //     } else if (element.orderType == "EVCharger") {
        //         console.log("System Date")
        //         console.log("Printing order========")
        //         console.log(element)
        //         charger = await chargerModel.find({ "_id": element.EV_charger_id }).select("brand model phase size")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(charger[0])))
        //         console.log("Printing object")
        //         console.log(obj)
        //     } else if (element.orderType == "Battery") {
        //         console.log("Inside Battery")
        //         battery = await batteryModel.find({ "_id": orders[0].battery_id }).select("brand model")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(battery[0])))
        //     } else if (element.orderType == "System") {
        //         console.log("Inside System")
        //         panel = await Panels.find({ "_id": element.panel_id }).select("brand model")
        //         inverter = await inverters.find({ "_id": element.inverter_id }).select("brand model")
        //         optimizer = await optimizerModel.find({ "_id": element.optimizer_id }).select("brand model")
        //         charger = await chargerModel.find({ "_id": element.EV_charger_id }).select("brand model phase size")
        //         battery = await batteryModel.find({ "_id": orders[0].battery_id }).select("brand model")
        //         obj = Object.assign(obj, JSON.parse(JSON.stringify(element)), JSON.parse(JSON.stringify(panel[0])), JSON.parse(JSON.stringify(inverter[0])), JSON.parse(JSON.stringify(optimizer[0])), JSON.parse(JSON.stringify(charger[0])), JSON.parse(JSON.stringify(battery[0])))
        //     }

        // }

        console.log("Outside For loop")
        // res.json(Object.assign(JSON.parse(JSON.stringify(orders[0])),JSON.parse(JSON.stringify(charger[0]))))
        res.json(orders)
        console.log(orders)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Register new user 
router.post('/signup', async (req, res) => {
    const userDetails = new userModel({
        _id: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        suburb: req.body.suburb,
        state: req.body.state,
        zip: req.body.zip,
        password: bcrypt.hashSync(req.body.password, 10),
        user_type: req.body.user_type
    });

    userDetails.save((err, doc) => {
        if (!err) {
            console.log("User added successfully")
            res.status(201).send("User Account Created successfully")
        }
        else {
            console.log('Error during record insertion : ' + err);
            res.status(500).send("Please Check the details entered")
        }
    });
})

// Add Brand
router.post('/addBrand/:userId', upload.single("image"), async (req, res) => {

    const { file } = req;
    const params = {
        Bucket: S3_BUCKET,
        Key: `logos/${uuidv4()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    const data = await s3.send(new PutObjectCommand(params));
    if (data.$metadata.httpStatusCode === 200) {
        const objectUrl = `https://makemyenergy.s3.us-west-2.amazonaws.com/${params.Key}`
        const imageRepoModelDetails = new imageRepoModel({
            brand: req.body.brand,
            logo_image_url: objectUrl
        });

        imageRepoModelDetails.save((err, doc) => {
            if (!err) {
                console.log("Brand added successfully")
                res.status(201).send("Brand added successfully")
            }
            else {
                console.log('Error during record insertion : ' + err);
                res.status(500).json({ message: err.message })
            }
        });
    }
})


//Add New Panel Size
router.post('/addSizePanel/', async (req, res) => {

    const new_size = req.body.size
    const new_panels = req.body.panels
    const new_price = req.body.price


    // res.json(prod)
    console.log("Printing New Size ")
    // p=prod[0]["size"].push(size)
    // console.log("Printing panel size: "+object(p))
    Panels.updateOne(
        { _id: req.body.id },
        { $push: { size: new_size, no_of_panels: new_panels, price: new_price } },
        function (error, success) {
            if (error) {
                res.status(500).json({ message: err.message })
                console.log(error);
            } else {
                res.status(201).send("New Panel Size added successfully")
                console.log(success);
            }
        }
    );
});

//Add New Inverter Size
router.post('/addSizeInverter/', async (req, res) => {

    const new_size = req.body.size
    const new_price = req.body.price
    // res.json(prod)
    console.log("Printing New Size ")
    // p=prod[0]["size"].push(size)
    // console.log("Printing panel size: "+object(p))
    inverters.updateOne(
        { _id: req.body.id },
        { $push: { size: new_size, price: new_price } },
        function (error, success) {
            if (error) {
                res.status(500).json({ message: err.message })
                console.log(error);
            } else {
                res.status(201).send("New Inverter Size added successfully")
                console.log(success);
            }
        }
    );
});



//Add New Charger Size
router.post('/addSizeCharger/', async (req, res) => {

    const new_size = req.body.size
    const new_price = req.body.price


    // res.json(prod)
    console.log("Printing New Size ")
    // p=prod[0]["size"].push(size)
    // console.log("Printing panel size: "+object(p))
    chargerModel.updateOne(
        { _id: req.body.id },
        { $push: { size: new_size, price: new_price } },
        function (error, success) {
            if (error) {
                res.status(500).json({ message: err.message })
                console.log(error);
            } else {
                res.status(201).send("New Charger Size added successfully")
                console.log(success);
            }
        }
    );
});

// Get STC Discount -- Paramters required: Zip, Panel Model(Size), Number of Panels :panelModel/:numberOfPanels
router.get('/getSTC/:zip/:panelModel/:numberOfPanels', async (req, res) => {
    const zip = req.params.zip
    const panelModel = req.params.panelModel
    const num_of_panels = req.params.numberOfPanels
    const regex = /\d+/g;
    const panelSize = panelModel.match(regex);
    try {
        const stcPrice = await STCModel.find()
        const ZipZoneRatingModel = await zipZoneRatingModel.find({ $and: [{ "from": { $lte: zip }, "to": { $gte: zip } }] })

        const stc = stcPrice[0].price * ZipZoneRatingModel[0].rating * panelSize * num_of_panels

        // res.json(ZipZoneRatingModel)
        res.json({ "stc": Math.floor(stc) })
        console.log(Math.floor(stc))
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get STC Price for admin panel
router.get('/getStcPrice', async (req, res) => {

    try {
        const stcPrice = await STCModel.find()
        res.json(stcPrice)
        console.log(stcPrice)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Update Stc Price
router.post('/updateStcPrice', async (req, res) => {

    try {
        const stcPriceResp = await STCModel.updateOne({ "_id": req.body.id }, { $set: { "price": req.body.price } })
        res.json(stcPriceResp)
        console.log(stcPriceResp)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})


// Get State Rebate -- Call API by sending State name as parameter and a Boolean flag if battery is selected or not
router.get('/getRebate/:state/', async (req, res) => {
    const state = req.params.state
    try {
        const stateRebateModel = await stateRebate.find({ "states": state })
        res.json(stateRebateModel)
        console.log(stateRebateModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get all rebates
router.get('/getRebates', async (req, res) => {

    try {
        const stateRebateModel = await stateRebate.find()
        res.json(stateRebateModel)
        console.log(stateRebateModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get zip zone rating
router.get('/getZipZone', async (req, res) => {

    try {
        const ZipZoneRatingModel = await zipZoneRatingModel.find()
        res.json(ZipZoneRatingModel)
        console.log(ZipZoneRatingModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Update zip zone rating
router.post('/updateZipZone', verifyAdminToken, async (req, res) => {

    try {
        const ZipZoneRatingModel = await zipZoneRatingModel.updateOne({ "_id": req.body.id }, { $set: { "zone": req.body.zone, "rating": req.body.rating } })
        res.json(ZipZoneRatingModel)
        console.log(ZipZoneRatingModel)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

//Update Rebate
router.post('/updateRebate', async (req, res) => {
    try {
        const stateRebateModelResp = await stateRebate.updateOne({ "_id": req.body.id }, { $set: { "state_cd": req.body.state_cd, "panel_rebate": req.body.panel_rebate, "battery_rebate": req.body.battery_rebate, "states": req.body.states } })
        res.json(stateRebateModelResp)
        console.log(stateRebateModelResp)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get User by ID
router.get('/getUser/:userId/', async (req, res) => {
    try {
        const user = await userModel.find({ "_id": req.params.userId }).select("first_name last_name email phone address suburb state zip electricity_bill_url meterboard_url meter_standing_pos inverter_standing_pos inverter_url roof_url progress_url")
        res.json(user)
        console.log(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

// Get All Users
router.get('/getAllUser', async (req, res) => {
    try {
        const user = await userModel.find().select("first_name last_name email phone address suburb state zip electricity_bill_url orders meterboard_url meter_standing_pos inverter_url progress_url")
        res.json(user)
        console.log(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;