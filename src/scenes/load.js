// Cheesy and inefficient, but it lets us load the scenes in the proper order
define(["scenes/intro"], function() {
require(["scenes/china"], function() {
require(["scenes/flyaway"], function() {
require(["scenes/zacky"], function() {
require(["scenes/meeting"], function() {
require(["scenes/friendship"], function() {
require(["scenes/departing"], function() {
require(["scenes/california"], function() {
require(["scenes/wedding"], function() {
})})})})})})})})});
