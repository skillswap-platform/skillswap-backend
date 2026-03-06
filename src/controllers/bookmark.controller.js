import Bookmark from "../models/Bookmark.js";
// import Resource from "../models/Resource.js";

// POST /api/bookmarks
export const createBookmark = async (req, res, next) => {
  try {
    const { resourceId } = req.body;
    const userId = req.user.id;

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
    next(error);
  }
};


// GET /api/users/:id/bookmarks
export const getUserBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.user.id
    }).populate("resourceId");

    const formatted = bookmarks.map(b => ({
      resourceId: b.resourceId._id,
      title: b.resourceId.title,
      type: b.resourceId.type,
      url: b.resourceId.url
    }));

    res.json(formatted);

  } catch (error) {
    next(error);
  }
};