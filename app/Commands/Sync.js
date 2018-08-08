"use strict";

const Command = use("Command");
const got = use("got");
const Bar = use("App/Model/Bar");
const Mongorito = use("mongorito");
const slug = use("slug");

class Sync extends Command {
  /**
   * signature defines the requirements and name
   * of command.
   *
   * @return {String}
   */
  get signature() {
    return "sync {url}";
  }

  /**
   * description is the little helpful information displayed
   * on the console.
   *
   * @return {String}
   */
  get description() {
    return "Sync bars from an external resource";
  }

  /**
   * handle method is invoked automatically by ace, once your
   * command has been executed.
   *
   * @param  {Object} args    [description]
   * @param  {Object} options [description]
   */
  *handle(args, options) {
    let newBars = 0;

    this.info(`Requesting ${args.url}`);

    const response = yield got(args.url);
    const res = JSON.parse(response.body);

    slug.charmap["Θ"] = "TH";
    slug.charmap["θ"] = "th";
    slug.charmap["Ξ"] = "KS";
    slug.charmap["ξ"] = "ks";

    const s = {
      lowercase: true,
      charmap: slug.charmap
    };

    this.info(`Identified ${res.data.length} bars`);

    for (let bar of res.data) {
      bar.slug = `${slug(bar.address.region, s)}/${slug(
        bar.address.area,
        s
      )}/${slug(bar.title, s)}`.toLowerCase();

      const barCheck = yield Bar.where("key", bar.key).findOne();

      if (!barCheck) {
        newBars++;
        const newBar = new Bar(bar);
        yield newBar.save();
      }
    }

    Mongorito.disconnect();

    this.info(`Added ${newBars} new bars`);
    this.info(`Finished syncing data`);
  }
}

module.exports = Sync;
