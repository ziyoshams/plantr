const models = require("./models");

models.db
  .sync({ force: true })
  .then(() =>{
    // Create a Gardener
    const Gardener = models.Gardener;
    return Gardener.create({
      name: 'Gardener' + Math.floor(Math.random() * 100),
      age: Math.floor(Math.random() * 18 + 10)
    })
  }).then((gardener) =>{
    console.log('Gardener was created');

    // Create a Plot
    const Plot = models.Plot;
    return Plot.create({
      size: Math.floor(Math.random() * 1000),
      shaded: true,
      gardenerId: gardener.id
    });
  })
  .then((plot) => {
    console.log('Plot was created');

    // Create a Vegetable
    const Vegetable = models.Vegetable;

    // ===========   Randomly pick a vegetable from this array  ========//
    let vegs = ['tomato', 'carrot', 'potato', 'cucumber', 'cauliflower', 'pepper'];
    let colors = ['red', 'green', 'white', 'yellow', 'purple', 'orange'];
    // ==================================================================//
    
    Vegetable.create({
        name: vegs[Math.floor(Math.random() * vegs.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        planted_on: new Date()
    }).then((vegetable) =>{

      // Connect the Vegetable with its plot
      const PlotVegetable = models.db.model('vegetable_plot')

      return PlotVegetable.create({
        vegetableId: vegetable.id,
        plotId: plot.id
      });
    
    })
   //db.close()
  })
  .then((plotVeg) =>{
    console.log('PlotVegetable was created');
  })
  .catch(err => {
    console.log(err);
    //db.close()
  });
