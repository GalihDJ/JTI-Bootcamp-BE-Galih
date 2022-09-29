const mongo = require('mongojs');
const { router } = require('.');
const db = mongo('mongodb+srv://galihdj:techcamp@techcampcluster.aelxboy.mongodb.net/tech-camp',['todo']);


// Get all data
router.get('/', function(req, res, next){

    db.todos
    .find({}, function(err, result){
        if(err){
            res.send(err)
        } else{
            res.json(result);
        }
    });
});

// Get request by query
router.get('/', function(req, res, next){

    let query = {}; 
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
        if (req.query.isCompleted === 'true') query.isCompleted = true;
        else query.isCompleted = false;
    };

    db.todo
    .find({}, function(err, result){
        if(err){
            res.send(err)
        } else{
            res.json(result);
        }
    });
});


// Get request by id
router.get('/:id', function(req, res, next){

    let query = {
        _id: db.ObjectId(req.params.id)
    };

    db.todo
    .find({}, function(err, result){
        if(err){
            res.send(err)
        } else{
            res.json(result);
        }
    });
});


// Post request
router.post('/', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todo
        .save(todo, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });
    }

});


// Update request
router.put('/:id', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todo
        .replaceOne({
            _id: db.ObjectId(req.params.id)
        }, todo, {}, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });
    }

});


// Delete request
router.delete('/:id', function(req, res, next){

    db.todo
    .remove({
        _id: db.ObjectId(req.params.id)
    }, function(err, result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });

});

