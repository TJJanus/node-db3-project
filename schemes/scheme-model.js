// scheme-model
const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

// Had to move the model into their own function because the findById was not defined due to closures

    function find() {
        return db('schemes')
    }

    function findById(id) {
        return db('schemes').where({ id }).first()
    }

    function findSteps(id) {
        return db('schemes as s')
            .join('steps as st', 's.id', 'st.scheme_id')
            .select('s.id','s.scheme_name', 'st.step_number', 'st.instructions')
            .where({'s.id': id})
    }

    function add(scheme) {
        return db('schemes').insert(scheme)
        .then( ([id]) => {
            return findById(id)
        })
            
    }

    function update(changes, id) {
        return db('schemes')
            .where({ id: id })
            .update(changes)
            .then(() => {
                return findById(id)
            })
    }

    function remove(id) {
        return db('schemes')
            .where({ id })
            .del();
    }




