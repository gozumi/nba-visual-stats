import * as express from 'express'

import * as path from 'path'

export default express()
  .set('port', process.env.PORT || 5000)
  .use(express.static(path.join(__dirname, '../public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/really_working', (req, res) => res.send('It is really working!!!'))
  .get('/times', (req, res) => {
    let result = ''
    const times = process.env.TIMES || 5
    for (let i = 0; i < times; i++) {
      result += `${i} `
    }
    res.send(result)
  })
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))
