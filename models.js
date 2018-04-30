const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr', {logging: false})

module.exports = db

const Gardener = db.define('gardener',{
  name: Sequelize.STRING,
  age:  Sequelize.INTEGER
})

const Plot = db.define('plot',{
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetable',{
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
})

Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})

let plot

const vegetableName = Vegetable.create({
  name: 'onion',
  color: 'white',
  planted_on: '2018-01-10'
})
vegetableName.then(() => {
  console.log('it was created!!! Waiting to log!')
})

Gardener.create({
  name: 'John',
  age: 65
})
.then((gardener) => {
  return Plot.create({
    size: 50,
    shaded: false,
    gardenerId: gardener.id})
})
.then((createdPlot) => {
  plot = createdPlot
  console.log('plot'+ plot + 'is created')

  return new Vegetable({
    name: 'carrot',
    color: 'orange',
    planted_on: '2018-01-20'
  })
})
.then((carrot) => {
  const VegetablePlot = db.model('vegetable_plot')

  return VegetablePlot.create({
    vegetableId: carrot.id,
    plotId: plot.id
  })

  console.log('new error')
})
.then((vegPlot) =>{
  console.log('Vegetable plot was created');
})
