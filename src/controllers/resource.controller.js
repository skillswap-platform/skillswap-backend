import Resource from "../models/Resource.js";


export const createResource = async (req, res) => {
  try {
    const { mentorId, skillId, type, title, url } = req.body;

    const resource = await Resource.create({
      mentorId,
      skillId,
      type,
      title,
      url
    });

    res.status(201).json({
      _id: resource._id,
      mentorId: resource.mentorId,
      skillId: resource.skillId,
      type: resource.type,
      title: resource.title,
      url: resource.url
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getResourcesBySkill = async (req, res) => {
  try {
    const { skillId } = req.query;

    const resources = await Resource.find({ skillId });

    const formatted = resources.map(r => ({
      _id: r._id,
      title: r.title,
      type: r.type,
      url: r.url,
      mentorId: r.mentorId
    }));

    res.json(formatted);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};