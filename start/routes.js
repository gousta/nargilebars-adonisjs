"use strict";

const Route = use("Route");
const Config = use("Config");
const Bar = use("App/Models/Bar");

Route.get("/", async ({ view }) => {
  return view.render("welcome", {
    page: "welcome",
    bars: global._Bars,
    barsByArea: global._BarsByArea,
    googleMapsKey: Config.get("googlemaps.key")
  });
});

Route.get("/discover/:region/:area/:key", async ({ params, view }) => {
  const slug = params.region + "/" + params.area + "/" + params.key;
  const bar = await Bar.where("slug", slug).findOne();

  if (!bar) {
    return view.render("errors.404");
  }

  return view.render("bar", {
    page: "bar",
    pageTitle: `${bar.get("title")} @ ${bar.address.area}`,
    pageDescription: `Μαθε τα πάντα για το κατάστημα ναργιλέ ${bar.title} στην περιοχή ${bar.address.area} και δες reviews ή φωτογραφίες. Ανακάλυψε ακόμα περισσότερα μαγαζία με ναργιλέ στο nargilebars.gr`,
    bar: bar,
    bars: global._Bars,
    barsByArea: global._BarsByArea,
    googleMapsKey: Config.get("googlemaps.key")
  });
});

Route.get("/sitemap.xml", async ({ view }) => {
  return view.render("sitemap", {
    page: "sitemap",
    bars: global._Bars,
    bootAt: global._bootAt.toISOString(),
  });
});

Route.get("/contact", async ({ view }) => {
  return view.render("contact", {
    page: "contact",
    bars: global._Bars,
    barsByArea: global._BarsByArea
  });
});

Route.post("/contact", async ({ view, request }) => {
  console.log("nargilebars->contact", JSON.stringify(request.all()));

  return view.render("contact", {
    page: "contact",
    bars: global._Bars,
    barsByArea: global._BarsByArea,
    message: "Το μήνυμα σας στάλθηκε. Θα σας απαντήσουμε σύντομα."
  });
});

Route.group("api_v1", function () {
  Route.get("/bar", async ({ response }) => {
    const bars = await Bar.find();

    response.json({
      status: "ok",
      data: bars
    });
  });
}).prefix("api/v1");
