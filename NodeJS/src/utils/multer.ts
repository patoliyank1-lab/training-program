import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Folder location
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req:any, file:any, cb:any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject file
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 1 MB limit
});
