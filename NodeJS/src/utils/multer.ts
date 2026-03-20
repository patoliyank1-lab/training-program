import multer from "multer";

const storage = multer.memoryStorage();
/**
 * this is fileFilter for filter image.
 * @param req Api express Request. 
 * @param file file given with Request.
 * @param cb callback function which is use by multer for fileFilter.
 */
const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject file
  }
};

/**
 * configuration for multer with file size 5MB
 */
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});
