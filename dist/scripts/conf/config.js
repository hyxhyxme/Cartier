"use strict";

requirejs({
  baseUrl: "http://localhost:8000/",
  paths: {
    "jquery": "static/scripts/jquery-2.0.3",
    "swiper": "static/scripts/swiper",
    "css": "scripts/lib/css",
    "cloudzoom": "static/scripts/cloudzoom",
    "accordion": "static/scripts/accordion"
  },
  shim: {
    "cloudzoom": {
      deps: ["css!static/sheets/cloudzoom.css"]
    },
    "swiper": {
      deps: ["css!static/sheets/swiper.css"]
    },
    "accordion": {
      deps: ["css!static/sheets/accordion.css"]
    }
  }
});