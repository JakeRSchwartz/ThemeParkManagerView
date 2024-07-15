import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv/config'

const baseDirectory = process.env.BASE_DIRECTORY// Adjust this as necessary

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.body.type // Make sure 'type' is included in the form data from the client
    const dest = path.join(baseDirectory, type) // Adjust the path as necessary
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage: storage })

 function adjustPathForDB (req, res, next) {
  if (req.file) {
    // Assuming the base directory is 'src/frontend/assets' and you want to reference from two levels above 'src/'
    const desiredBase = path.join(__dirname, '../../') // This might need adjustment depending on where this code resides in your project structure
    const relativePath = path.relative(desiredBase, req.file.path)
    req.file.dbPath = `../../${relativePath}`
  }
  next()
}


export default { upload, adjustPathForDB}
