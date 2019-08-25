const proto = [
  {
    "count": 1,
    "status": false,
    "_id": "5d6093bedbc41613d6a2e9c1",
    "product": "5d5ffbd47f4f75162e44d4be"
  },
  {
    "count": 1,
    "status": false,
    "_id": "5d6095289d6fe114ff655491",
    "product": "5d5ffbd47f4f75162e44d4be"
  },
  {
    "count": 1,
    "status": false,
    "_id": "5d609544f95fb0153fda6627",
    "product": "5d5ffbd47f4f75162e44d4be"
  }
]

console.log(proto.filter(e => e.product === '5d5ffbd47f4f75162e44d4be'));