"use strict";

const Route = use("Route");
const Config = use("Config");
const Bar = use("App/Models/Bar");
const _ = use("lodash");

const groupByArea = (bars) => {
  return _.sortBy(
    _.map(_.groupBy(bars, "address.area"), (v, area) => ({
      area: area,
      bars: v
    })),
    "area"
  );
};

Route.get("/", async ({ view }) => {
  const bars = await Bar.find();

  return view.render("welcome", {
    page: "welcome",
    bars: bars,
    barsByArea: groupByArea(bars),
    googleMapsKey: Config.get("googlemaps.key")
  });
});

Route.get("/discover/:region/:area/:key", async ({ params, view }) => {
  const slug = params.region + "/" + params.area + "/" + params.key;
  const bar = await Bar.where("slug", slug).findOne();

  if (!bar) {
    return view.render("errors.404");
  }

  const bars = await Bar.find();

  return view.render("bar", {
    page: "bar",
    pageTitle: `${bar.get("title")} @ ${bar.address.area}`,
    pageDescription: `Κατάστημα ${
      bar.title
    }, ${bar.fullAddress()} - Ναργιλεδάδικα, Cafes, Bars, Lounges`,
    bar: bar,
    bars: bars,
    barsByArea: groupByArea(bars),
    googleMapsKey: Config.get("googlemaps.key")
  });
});

Route.get("/contact", async ({ view }) => {
  return view.render("contact", {
    page: "contact"
  });
});

Route.post("/contact", async ({ view }) => {
  console.log("CONTACT_REQUEST", JSON.stringify(request.all()));

  return view.render("contact", {
    page: "contact",
    bars: await Bar.find(),
    barsByArea: groupByArea(bars),
    message:
      "Το μήνυμα σας στάλθηκε. Θα προσπαθήσουμε να απαντήσουμε εντός μιας εβδομάδας."
  });
});

Route.group("api_v1", function() {
  Route.get("/bar", async ({ response }) => {
    const bars = await Bar.find();

    response.json({
      status: "ok",
      data: bars
    });
  });
}).prefix("api/v1");
