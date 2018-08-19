const { hooks } = require("@adonisjs/ignitor");
const _ = require("lodash");

const groupBarsByArea = bars =>
  _.sortBy(
    _.map(_.groupBy(bars, "address.area"), (v, area) => ({
      area: area,
      bars: v
    })),
    "area"
  );

hooks.after.providersBooted(() => {
  const Bar = use("App/Models/Bar");

  Bar.find()
    .then(bars => {
      global._Bars = bars;

      console.info(
        "global._Bars",
        `is populated with ${global._Bars.length} bars.`
      );

      global._BarsByArea = groupBarsByArea(bars);
      console.info(
        "global._BarsByArea",
        `is populated with ${global._BarsByArea.length} areas.`
      );
    })
    .catch(console.error);
});
