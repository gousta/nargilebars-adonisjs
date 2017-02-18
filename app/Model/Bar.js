'use strict'

const MongoritoModel = use('MongoritoModel')

class Bar extends MongoritoModel {
    slug() {
        return `/discover/${this.attributes.slug}`
    }

    address() {
        let address = this.attributes.address;
        return `${address.street}, ${address.area} ${address.zip}`
    }

    directions() {
        return `http://maps.google.com/maps?q=${this.attributes.position.latitude},${this.attributes.position.longitude}`;
        // return `http://maps.google.com/?q=` + encodeURIComponent(this.address());
    }
}

module.exports = Bar
