'use strict'

var semver = require('semver')
var sortComparators = require('sort-semver-comparators')
var isValid = require('is-comparator-valid')

exports.range = function rangeResolves (range) {
  return new semver.Range(range).set.some(comparatorsResolve)
}

exports.comparators = comparatorsResolve

function comparatorsResolve (comparators) {
  return sortComparators(comparators).every(intersectsPrevious)
}

function intersectsPrevious (current, index, comparators) {
  // first comparator can't be <0
  if (!index) return isValid(current)
  var previous = comparators[index - 1]
  if (previous.semver.version !== current.semver.version) {
    // versions are not the same
    // test that each version passes the other's comparator
    return previous.test(current.semver.toString()) && current.test(previous.semver.toString())
  }
  // duplicates are ok (2.0.0 2.0.0)
  if (!current.operator && !previous.operator) return true

  // opposite ranges don't overlap unless they're >=/<=
  if (current.operator && previous.operator && current.operator.charAt(0) !== previous.operator.charAt(0)) {
    if (![previous, current].every(hasEquals)) return false
  }

  // otherwise at least one must be >= or <=
  // > and < do not intersect
  return [previous, current].some(hasEquals)
}

function hasEquals (comparator) {
  return ~comparator.operator.indexOf('=')
}
