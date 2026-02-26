import Bookmark from "../models/Bookmark.js";
// import Resource from "../models/Resource.js";

// POST /api/bookmarks
export const createBookmark = async (req, res) => {
  try {
    const { userId, resourceId } = req.body;

    const bookmark = await Bookmark.create({
      userId,
      resourceId
    });

    res.status(201).json({
      _id: bookmark._id,
      userId: bookmark.userId,
      resourceId: bookmark.resourceId,
      savedAt: bookmark.savedAt
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// GET /api/users/:id/bookmarks
export const getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.params.id
    }).populate("resourceId");

    const formatted = bookmarks.map(b => ({
      resourceId: b.resourceId._id,
      title: b.resourceId.title,
      type: b.resourceId.type,
      url: b.resourceId.url
    }));

    res.json(formatted);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};