var method = Guild.prototype;

/**
 * @name Guild
 * @param name
 * @constructor
 */
function Guild(name) {
  this._name = name;
}

method.setLevel = function(level) {
  this._level = level;
};

method.getLevel = function() {
  return this._level;
};

method.setName = function(name) {
  this._name = name;
};

method.getName = function() {
  return this._name;
};

method.setRealm = function(realm) {
  this._realm = realm;
};

method.getRealm = function() {
  return this._realm;
};

method.setPoints = function(points) {
  this._points = points;
};

method.getPoints = function() {
  return this._points;
};

method.setEmblem = function(emblem) {
  this._emblem = emblem;
};

method.getEmblem = function() {
  return this._emblem;
};

method.setSide = function(side) {
  this._side = side;
};

method.getSide = function() {
  return this._side;
};


module.exports = Guild;
