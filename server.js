const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Настройка CORS
app.use(cors());

// Middleware для статических файлов
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Создаем папку для загрузок, если ее нет
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Разрешены только изображения (jpeg, jpg, png, gif)'));
        }
    }
}).array('photos', 10); // До 10 файлов за раз

// Роут для получения списка изображений
app.get('/api/images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err);
            return res.status(500).json({ error: 'Не удалось прочитать папку с изображениями' });
        }

        // Фильтруем только изображения
        const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        });

        res.json(images);
    });
});

// Роут для загрузки изображений
app.post('/api/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                // Ошибка Multer (например, превышение размера файла)
                return res.status(400).json({ success: false, message: err.message });
            } else {
                // Другие ошибки
                return res.status(400).json({ success: false, message: err.message });
            }
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'Файлы не были загружены' });
        }

        res.json({ 
            success: true, 
            message: 'Файлы успешно загружены',
            uploadedCount: req.files.length,
            files: req.files.map(file => file.filename)
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});