const multer=require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Append current date and original filename
    }
  });
  
  const upload = multer({ storage: storage });
  module.exports=upload;