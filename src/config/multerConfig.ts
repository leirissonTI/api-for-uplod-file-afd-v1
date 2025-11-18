import multer from 'multer'

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/')  // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)  // Nome único para evitar conflitos
  }
})

// Filtro opcional para aceitar apenas certos tipos de arquivo
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'text/plain' || file.mimetype === 'application/octet-stream') {
    cb(null, true)
  } else {
    cb(new Error('Tipo de arquivo não permitido'), false)
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}) 