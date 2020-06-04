var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')

var indexRouter = require('./routes/index')
var sensorRouter = require('./routes/sensor')
var room14 = require('./routes/room14')
var roomServertelpa = require('./routes/roomServertelpa')
var roomVideo = require('./routes/roomVideo')
var roomDisp = require('./routes/roomDisp')
var room13 = require('./routes/room13')

var room14co2 = require('./routes/room14co2')
var room14temp = require('./routes/room14temp')
var room14humidity = require('./routes/room14humidity')

var roomServco2 = require('./routes/roomServco2')
var roomServtemp = require('./routes/roomServtemp')
var roomServhumidity = require('./routes/roomServhumidity')

var room13co2 = require('./routes/room13co2')
var room13temp = require('./routes/room13temp')
var room13humidity = require('./routes/room13humidity')

var roomDispco2 = require('./routes/roomDispco2')
var roomDisptemp = require('./routes/roomDisptemp')
var roomDisphumidity = require('./routes/roomDisphumidity')

var roomVidco2 = require('./routes/roomVidco2')
var roomVidtemp = require('./routes/roomVidtemp')
var roomVidhumidity = require('./routes/roomVidhumidity')

var alertsRouter = require('./routes/alerts')
var roomNamesRouter = require('./routes/roomnames')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter)
app.use('/filldb', sensorRouter) 
app.use('/alerts', alertsRouter)
app.use('/roomnames', roomNamesRouter)


app.use('/14telpa', room14)
app.use('/14telpa/co2', room14co2)
app.use('/14telpa/temp', room14temp)
app.use('/14telpa/humidity', room14humidity)

app.use('/Servertelpa', roomServertelpa)
app.use('/Servertelpa/co2', roomServco2)
app.use('/Servertelpa/temp', roomServtemp)
app.use('/Servertelpa/humidity', roomServhumidity)

app.use('/Videotelpa', roomVideo)
app.use('/Videotelpa/co2', roomVidco2)
app.use('/Videotelpa/temp', roomVidtemp)
app.use('/Videotelpa/humidity', roomVidhumidity)

app.use('/Dispecerutelpa', roomDisp)
app.use('/Dispecerutelpa/co2', roomDispco2)
app.use('/Dispecerutelpa/temp', roomDisptemp)
app.use('/Dispecerutelpa/humidity', roomDisphumidity)

app.use('/13telpa', room13)
app.use('/13telpa/co2', room13co2)
app.use('/13telpa/temp', room13temp)
app.use('/13telpa/humidity', room13humidity)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
