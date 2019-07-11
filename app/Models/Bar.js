"use strict";

const BaseModel = use("MongooseModel");

class Bar extends BaseModel {
  static get timestamps() {
    return false;
  }

  static get schema() {
    return {
      key: String,
      position: {
        latitude: Number,
        longitude: Number
      },
      title: String,
      content: String,
      address: {
        street: String,
        area: String,
        region: String,
        zip: String
      },
      phone: String,
      slug: String
    };
  }

  url() {
    return `/discover/${this.slug}`;
  }

  fullAddress() {
    return `${this.address.street}, ${this.address.area} ${this.address.zip}`;
  }

  directions() {
    const { latitude, longitude } = this.position;
    return `http://maps.google.com/maps?q=${latitude},${longitude}`;
  }

  lastUpdated() {
    console.log(this.updated_at);
    return this.updated_at;
  }
}

module.exports = Bar.buildModel("Bar");
