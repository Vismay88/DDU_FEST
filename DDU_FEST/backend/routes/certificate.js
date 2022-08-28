const router = require("express").Router();
const Certificate = require("../models/Certificate");
const Event = require("../models/Event");

//upload_certificate
router.post("/certificate_upload", async (req, res) => {
    try {
        const newcerticate = new Certificate(req.body)
        const ev=await Event.findById(req.body.eventId);
        await ev.updateOne({$push:{uploaded:req.body.userId}})
        const certi = await newcerticate.save();
        res.status(200).json("uploaded successfully");
    } catch (error) {
        res.status(500).json(error);
    }

})
//get certificated of particular event

router.get("/:id", async (req, res) => {
    try {
        const certis = await Certificate.find();
        let  temp = [];
        certis.map((ev) => {
            if (ev.eventId === req.params.id) {
                temp.push(ev);
            }
        })
        res.status(200).json(temp);
    } catch (error) {
        res.status(500).json(error);
    }

})



module.exports = router;