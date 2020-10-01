const Solicitude = require("../models/solicitude.model");
const Client = require("../models/client.model");
const Pilot = require("../models/pilot.model");

module.exports = {
  async list(req, res) {
    try {
      const solicitude = await Solicitude.find().populate({
        path: "client",
        select: "_id name", // separados por un espacio
      });
      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { clientId } = req.body;

      const client = await Client.findById(clientId);
      const solicitude = await Solicitude.create({ ...data, client });

      client.solicitudes.push(solicitude);
      await client.save({ validateBeforeSave: false });

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.findById(id);

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showclient(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.find({ client: id });

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const solicitude = await Solicitude.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.findByIdAndDelete(id);

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async filter(req, res) {
    const { info } = req.body;
    const { pilotId } = req.body;
    let solicitude;
    let selectCriteria = "phone name email";
    try {
      if (info.categorie && info.departmentID && info.city) {
        solicitude = await Solicitude.find({
          $and: [
            { servicetype: info.categorie },
            { department: parseInt(info.departmentID) },
            { city: info.city },
          ],
        }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else if (info.departmentID && info.city) {
        solicitude = await Solicitude.find({
          $and: [
            { department: parseInt(info.departmentID) },
            { city: info.city },
          ],
        }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else if (info.departmentID && info.categorie) {
        solicitude = await Solicitude.find({
          $and: [
            { department: parseInt(info.departmentID) },
            { servicetype: info.categorie },
          ],
        }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else if (info.categorie) {
        solicitude = await Solicitude.find({ servicetype: info.categorie }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else if (info.departmentID) {
        solicitude = await Solicitude.find({
          department: parseInt(info.departmentID),
        }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else if (info.city) {
        solicitude = await Solicitude.find({ city: info.city }).populate({
          path: "client",
          select: selectCriteria, 
        });
      } else {
        solicitude = await Solicitude.find({}).populate({
          path: "client",
          select: selectCriteria, 
        });
      }

      const pilot = await Pilot.findById(pilotId);
      const payedSolicitudes = pilot.payedSolicitudes;

      if (solicitude) {

        for (const element of solicitude) {
          element.clientName = element.client.name
          element.phone = element.client.phone
          element.clientEmail = element.client.email
        }

        const payedFilter = solicitude.filter(element => {
          if(payedSolicitudes.find(e => e.toString() === element._id.toString())) return true;
          return false;
        })
  
        const unpayedFilter = solicitude.filter(element => {
          if(payedSolicitudes.find(e => e.toString() === element._id.toString())) return false;
          return true;
        })
  
        for (const element of unpayedFilter) {
          element.clientName = element.clientName.substr(0,3) + element.clientName.slice(3).replace(/[\w!#$%^&*(),?ÁáÉéÍíÓóÚúÄäËëÏïÖöÜü":{}|<>]/g,'x')
          element.phone = element.phone.substr(0,3) + element.phone.slice(3).replace(/\d/g,'x')
          element.clientEmail = element.clientEmail.substr(0,3) + element.clientEmail.slice(3).replace(/[\w!#$%^&*(),?ÁáÉéÍíÓóÚúÄäËëÏïÖöÜü":{}|<>]/g,'x')
        }
        
        solicitude = [...payedFilter, ...unpayedFilter];
      }
      
      res.status(200).json(solicitude);
    } catch (err) {
      console.log(err);
    }
  },

  async paySolicitude(req, res) {
    try {
      const { pilotId } = req.body;
      const { solicitudeId } = req.body;
      const pilot = await Pilot.findById(pilotId);

      pilot.payedSolicitudes.push(solicitudeId);
      await pilot.save({ validateBeforeSave: false });

      res.status(200).json('Pago exitoso');
    } catch (err) {
      res.status(400).json(err);
    }
  }
};