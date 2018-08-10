"use strict";

const { Command } = use("@adonisjs/ace");
const got = use("got");
const slug = use("slug");
const Bar = use("App/Models/Bar");

class Sync extends Command {
  static get signature() {
    return "sync {url}";
  }

  static get description() {
    return "Sync bars from an external resource";
  }

  handle(args) {
    let newBars = 0;

    slug.charmap["Θ"] = "TH";
    slug.charmap["θ"] = "th";
    slug.charmap["Ξ"] = "KS";
    slug.charmap["ξ"] = "ks";

    const slugSchema = {
      lowercase: true,
      charmap: slug.charmap
    };

    this.info(`Requesting ${args.url}`);

    got(args.url).then((res) => {
      res = JSON.parse(res.body);

      this.info(`Identified ${res.data.length} bars`);

      res.data.forEach((bar) => {
        const region = slug(bar.address.region, slugSchema);
        const area = slug(bar.address.area, slugSchema);
        const shop = slug(bar.title, slugSchema);

        bar.slug = `${region}/${area}/${shop}`.toLowerCase();

        Bar.where({ key: bar.key })
          .findOne()
          .then((check) => {
            console.log("check", check);
            if (!check) {
              newBars++;
              Bar.create(bar);
            }
          });
      });

      this.info(`Added ${newBars} new bars`);
      this.info(`Finished syncing data`);
    });
  }
}

module.exports = Sync;
