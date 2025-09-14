import express from 'express'
import path from 'path'
import posts from './routes/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const port = process.env.PORT || 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded( { extended:true}) ) 
app.use(cors())

//logger middleware
app.use(logger)


//setup static folder
app.use(express.static(path.join(__dirname, 'public')))


//routes
app.use('/api/posts', posts)

app.use(notFound)
app.use(errorHandler)


app.listen( port, () => console.log(`Server running on port ${port}`))