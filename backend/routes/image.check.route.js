import express from 'express';

const router = express.Router();

router.post("/validate", async (req, res) => {
  const imageUrl = req.body.url;

  if (!imageUrl) {
    return res.status(400).json({ valid: false, message: "Missing image URL" });
  }

  try {
    const response = await fetch(imageUrl, { method: "HEAD" });
    const contentType = response.headers.get("content-type");

    const isImage = contentType && contentType.startsWith("image/");
    const isOK = response.ok;

    if (isImage && isOK) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    console.error("Image check error:", err.message);
    res.json({ valid: false });
  }
});

export default router;