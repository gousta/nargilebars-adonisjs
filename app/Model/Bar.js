'use strict'

const MongoritoModel = use('MongoritoModel')

class Bar extends MongoritoModel {
    slug() {
        return `/bars/${this.attributes.slug}`
    }
}

module.exports = Bar
