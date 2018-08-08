"use strict";

const MongoritoModel = use("MongoritoModel");

class Bar extends MongoritoModel {
  slug() {
    return `/discover/${this.attributes.slug}`;
  }

  address() {
    const { address } = this.attributes;
    return `${address.street}, ${address.area} ${address.zip}`;
  }

  directions() {
    const { latitude, longitude } = this.attributes.position;
    return `http://maps.google.com/maps?q=${latitude},${longitude}`;
  }
}

module.exports = Bar;
