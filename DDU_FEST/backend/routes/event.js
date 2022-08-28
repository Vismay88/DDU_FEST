const router = require("express").Router();
const Event = require("../models/Event");

//create event

router.post("/create", async (req, res) => {
    try {
        const newevent = new Event(req.body)
        const ev = await newevent.save();
        res.status(200).json(ev);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

})

//update event
router.put("/:id", async (req, res) => {
    try {
        const ev = await Event.findById(req.params.id);
        await ev.updateOne({ $set: req.body })
        res.status(200).json("Event has been updated");
    } catch (error) {
        res.status(500).json(err)
    }
})


//get particular event by id
router.get("/:id", async (req, res) => {
    try {
        const ev = await Event.findById(req.params.id);
        res.status(200).json(ev)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete event 
router.delete("/:id", async (req, res) => {
    try {
        const ev = await Event.findById(req.params.id);
        await ev.deleteOne();
        res.status(200).json("event has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
})


//get all events

router.post("/all_events", async (req, res) => {
    try {
        const ev = await Event.find();
        res.status(200).json(ev)
    } catch (err) {
        res.status(500).json(err)
    }
})




//upcoming events
router.post("/upcoming_events", async (req, res) => {
    try {
        const ev = await Event.find();
        let past = [];
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        ev.map((e) => {
         
            if (e.datee>=today)
            {
                past.push(e);
            }
        })
        res.status(200).json(past)
    } catch (err) {
        res.status(500).json(err)
    }
})

//filter by date
router.post("/filter_date", async (req, res) => {
    try {
        const events = await Event.find();
        let filtered = [];
        events.map((ev) => {
            if (ev.datee >= req.body.from && ev.datee <= req.body.to) {
                filtered.push(ev);
            }
        })
        if (filtered.length != 0) {
            res.status(200).json(filtered);
        }

    } catch (error) {
        res.status(500).json(error)
    }

})


//events for generate report 
router.post("/report", async (req, res) => {
    try {
        const events = await Event.find();
        let filtered = [];
        events.map((ev) => {
            if (ev.datee >= req.body.from && ev.datee <= req.body.to) {
                 const newev={
                    title: ev.title,
                    category: ev.category,
                    rp_name: ev.rp_name,
                    organization: ev.organization,
                    desc: ev.desc,
                    venue: ev.venue,
                    time: ev.time,
                    datee: ev.datee,
                    org_by: ev.org_by,
                    tech_body: ev.tech_body,
                    coordinator: ev.coordinator,
                    fees: ev.fees,
                    participants: ev.participants.length,

                 }
                filtered.push(newev);
            }
        })
    
            res.status(200).json(filtered);
     

    } catch (error) {
        res.status(500).json(error)
    }

})


//get past event
router.post("/pastevent", async (req, res) => {
    try {
        const ev = await Event.find();
        let past = [];
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        ev.map((e) => {
         
            if (e.datee<today)
            {
                past.push(e);
            }
        })
        res.status(200).json(past);
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;