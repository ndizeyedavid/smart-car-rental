/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1117292342")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date3412625299",
    "max": "",
    "min": "",
    "name": "return_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1117292342")

  // remove field
  collection.fields.removeById("date3412625299")

  return app.save(collection)
})
