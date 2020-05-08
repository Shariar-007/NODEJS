assert = require('assert');

// call back method has drawback which is solved by promise
//===== this is callback method way to do operation ====

// exports.insertDocument = (db, document, collection, callback) => {
//     coll = db.collection(collection);
//     coll.insert(document, (err, result) => {
//         assert.equal(err, null);
//         console.log("Inserted " + result.result.n +
//             " documents into the collection " + collection);
//         callback(result);
//     });
// };

// exports.findDocuments = (db, collection, callback) => {
//     coll = db.collection(collection);
//     coll.find({}).toArray((err, docs) => {
//         assert.equal(err, null);
//         callback(docs);
//     });
// };

// exports.removeDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.deleteOne(document, (err, result) => {
//         assert.equal(err, null);
//         console.log("Removed the document ", document);
//         callback(result);
//     });
// };

// exports.updateDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.updateOne(document, { $set: update }, null, (err, result) => {
//         assert.equal(err, null);
//         console.log("Updated the document with ", update);
//         callback(result);
//     });
// };

//===== this is promise  method way to do operation ====

exports.insertDocument = (db, document, collection, callback) => {
    coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
    coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};