import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = new Date().toISOString().replace(/:/g, '_') +
        file.originalname;
        cb(null, uniqueSuffix)
    }
})

export const  upload = multer({ storage: storage })