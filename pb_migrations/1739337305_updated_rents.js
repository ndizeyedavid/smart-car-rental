/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1117292342")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number3402113753",
    "max": null,
    "min": null,
    "name": "price",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1117292342")

  // remove field
  collection.fields.removeById("number3402113753")

  return app.save(collection)
})
