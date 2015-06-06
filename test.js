'use strict'

var test = require('tape')
var semver = require('semver')
var resolves = require('./')

test(function (t) {
  t.ok(resolves.range('~2.0.0'))
  t.ok(resolves.range('2.x'))
  t.ok(resolves.range('>2'))
  t.ok(resolves.range('>2.2.0 <4'))

  t.notOk(resolves.range('<0'))
  t.notOk(resolves.range('>2 <1'))
  t.notOk(resolves.range('>=2 <1'))
  t.notOk(resolves.range('>2 <=1'))

  t.ok(resolves.range('<2 >4 || 5'))
  t.notOk(resolves.range('<2 >4 || <4 >5'))

  t.ok(resolves.range('<=2.0.0 2.0.0'))
  t.ok(resolves.range('2.0.0 2.0.0'))
  t.ok(resolves.range('<=2.0.0 >=2.0.0'))
  t.ok(resolves.range('<2.0.0 <=2.0.0'))

  var set = new semver.Range('<2 >4 || 5').set
  t.notOk(resolves.comparators(set[0]))
  t.ok(resolves.comparators(set[1]))

  t.end()
})
