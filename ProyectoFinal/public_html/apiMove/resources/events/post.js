// On POST /events
if (me) {
  dpd.users.put(me.id, {
    points: {$inc: 1}
  }, function() {});
}