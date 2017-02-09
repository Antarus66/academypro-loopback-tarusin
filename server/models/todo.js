'use strict';

var io = require(__dirname + '/../services/Sockets');

module.exports = function(Todo) {
    Todo.observe('after delete', function (ctx, next) {
        io.emit('removed', ctx.where);
        next();
    });

    Todo.observe('after save', function (ctx, next) {
        if (ctx.isNewInstance) {
            io.emit('added', ctx.instance);
        } else {
            io.emit('edited', ctx.instance);
        }

        next();
    });
};
