var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
var pg = require('pg');

var app = express();

// app.use(express.static('www'));
// app.use(express.static(path.join('www', 'build')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(bodyParser.json());

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5000/dreamhouse';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

var client = new pg.Client(connectionString);
client.connect();

var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';
var userTable = 'user__c';

// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
  if (error !== null) {
    client.query('SELECT * FROM broker__c', function(error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        require('./db/demo.js')(client);
        console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    var schema = 'salesforce.';
    propertyTable = schema + 'property__c';
    // favoriteTable = schema + 'favorite__c';
    brokerTable = schema + 'broker__c';
    // userTable = schema + 'user__c';
  }
});

app.get('/property', function(req, res) {
  client.query('SELECT * FROM ' + propertyTable, function(err, data) {
    if (err) throw err;
    res.json(data.rows);
  });
});

app.get('/property/:id', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + brokerTable + '.sfid AS broker__c_sfid, ' + brokerTable + '.name AS broker__c_name, ' + brokerTable + '.email__c AS broker__c_email__c, ' + brokerTable + '.phone__c AS broker__c_phone__c, ' + brokerTable + '.mobile_phone__c AS broker__c_mobile_phone__c, ' + brokerTable + '.title__c AS broker__c_title__c, ' + brokerTable + '.picture__c AS broker__c_picture__c FROM ' + propertyTable + ' INNER JOIN ' + brokerTable + ' ON ' + propertyTable + '.broker__c = ' + brokerTable + '.sfid WHERE ' + propertyTable + '.sfid = $1', [req.params.id], function(err, data) {
    if (err) throw err;
    res.json(data.rows[0]);
  });
});


app.get('/favorite/:id', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + favoriteTable + '.sfid AS favorite__c_sfid FROM ' + propertyTable + ', ' + favoriteTable + ' WHERE ' + propertyTable + '.sfid = ' + favoriteTable + '.property__c AND ' + favoriteTable + '.user__id = $1', [req.params.id], function(err, data) {
    if(err) throw err;
    res.json(data.rows);
  });
});

app.post('/favorite', function(req, res) {
  client.query('INSERT INTO ' + favoriteTable + ' (property__c, user__id) VALUES ($1, $2)', [req.body.property__c, req.body.user__id], function(err, data) {
    if (err) res.status(500).json({error: err, favoriteTable: favoriteTable, propertyTable: propertyTable,  property__c: req.body.property__c, id: req.body.user__id});
    res.json(data);
  });
});

app.delete('/favorite/:sfid', function(req, res) {
  client.query('DELETE FROM ' + favoriteTable + ' WHERE sfid = $1', [req.params.sfid], function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});


app.get('/broker', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable, function(err, data) {
    if (err) throw err;
    res.json(data.rows);
  });
});

app.get('/broker/:sfid', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable + ' WHERE sfid = $1', [req.params.sfid], function(err, data) {
    if (err) throw err;
    res.json(data.rows[0]);
  });
});

app.post('/login', function(req, res) {
  client.query('SELECT * FROM ' + userTable + ' WHERE email = $1', [req.body.email], function(err, data1) {
    if (data1.rows.length != 0) {
      var user = data1.rows[0];
      bcryptjs.compare(req.body.password, user.password, function(err , result) {
        if (result == true) {
          let signData = {
            id: user.id,
            email: user.email,
          }
          let token = jwt.sign(signData, 'secret', {
            expiresIn: 604800
          })
          res.status(201).json({user: signData, token: token, originPassword: data1.rows[0]});
        } else {
          res.status(500).json({error:err});
        }
      })
    } else {
      res.status(500).json({error: err})
    }
  })
});

app.post('/register', function(req, res) {
  const {email, password} = req.body;
  client.query('SELECT * FROM ' + userTable + ' WHERE email = $1', [req.body.email], (err, data) => {
    if (err) {
      res.status(500).send('err');
    } else if (data.rows.length > 0) {
      res.status(200).json('The email addresss is exist already');
    } else {
      bcryptjs.genSalt(10, function(err, salt) {
        if (err) res.status(500).send(err);
        bcryptjs.hash(password, salt, function(err, hash) {
          if (err) throw err;
          client.query('INSERT INTO ' + userTable + ' (email, password) VALUES ($1, $2)', [email, hash], (err, data) => {
            if (err) throw err;
            res.status(201).json(data)
          });
        });
      })
    }
  })
});

app.get('/profile/:id', function(req, res) {
  client.query('SELECT * FROM ' + userTable + ' WHERE id = $1', req.params.id, (err, data) => {
    if (err) throw err;
    res.status(201).json(data.rows[0]);
  })
});

app.put('/update/:id', function(req, res) {
  const {password} = req.body;
    client.query('SELECT * FROM ' + userTable + ' WHERE id = ' + req.params.id, function(err, data) {
      if (err) res.status(500).json({err: err});
      if (password.trim() == '') {
        res.status(200).json({status: 'ok'})
      } else {
        bcryptjs.genSalt(10, function(err, salt) {
          if (err) res.status(500).json({err: err});
          bcryptjs.hash(password, salt, function(err, hash) {
            if (err) res.status(500).json({err: err});
              client.query('UPDATE ' + userTable + ' SET password = $1 WHERE id = $2', [hash, req.params.id], (err, user) => {
              if (err) res.status(500).json({err: err});
              res.status(200).json(user);
            })
          })
        })
      }
    });

});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

var port = process.env.PORT || 8200;

app.listen(port);

//console.log('Listening at: http://localhost:' + port);
