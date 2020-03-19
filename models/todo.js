var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    /* id: { type: String, required: [true, 'The ID is required']}, */
    todo: { type: String, required:[true, 'TODO required']},
    completado: { type: Boolean, default:false}
})

module.exports = mongoose.model('Todo', todoSchema)