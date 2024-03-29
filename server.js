const compression = require('compression');
// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
var md5=require("md5");
// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The products collection
var PRODUCTS_COLLECTION = "products";

// Create new instance of the express server
var app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const path=require("path");
app.use(compression());

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

var nodemailer = require('nodemailer');
const { async } = require("rxjs/internal/scheduler/async");
const { getMaxListeners } = require("process");


// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/node-express-angular/";
app.use(express.static(distDir));


app.get('/Login',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/Inscription',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/restaurant',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/restaurant/*',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/e-kaly',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/e-kaly/*',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/e-kaly-admin/',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/e-kaly-admin/*',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));
app.get('/livreur',(req,res)=>res.sendFile(path.join(__dirname,'/dist/node-express-angular/index.html')));


// Local database URI.
const LOCAL_DATABASE = "mongodb+srv://tonio:1234@cluster0.ssolc.mongodb.net/e-kaly";
//mongodb+srv://fax:faxfax@app.41umm.mongodb.net
//mongodb://localhost:27017/app
//mongodb+srv://tonio:1234@cluster0.eka0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db('e-kaly');
        console.log("Database connection done.");

        //const db = client.db('star-wars-quotes2')
        //const quotesCollection = db.collection('quotes')

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/products"
 *  GET: finds all products
 */
app.get("/api/products", function (req, res) {
    database.collection('products').find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products"
 *   POST: creates a new product
 */
app.post("/api/products", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection('products').insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/products/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/products/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

app.get("/api/users/restos-ekaly/delete/:email/:option", function (req, res) {
    var mail=req.params.email;
    var option=req.params.option
    console.log("delete resto:"+mail);
    database.collection('user').updateOne({email:mail},{$set:{ekaly:option}},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","email": mail});
        }
    });
});



//Get all user
app.get("/api/users", function (req, res) {
    database.collection('user').find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});
//Get all resto ekaly
app.get("/api/users/restos-ekaly", function (req, res) {
    database.collection('user').find({profil:"resto",ekaly:"oui"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","resto": data});
        }
    });
});

//Delete resto in e-kaly



//Get all resto 
app.get("/api/users/restos", function (req, res) {
    database.collection('user').find({profil:"resto"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});



app.get("/api/plats", function (req, res) {
    
    var ObjectId = require('mongodb').ObjectID;
    database.collection('plats').find({ }).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});



app.get("/api/plats/:id", function (req, res) {
    var id=req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    database.collection('plats').find({_id: new ObjectID(id) }).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});



app.post("/api/plats-update/:id", function (req, res) {
    var id=req.params.id;
    var plat = req.body;
   // console.log(id);
    var ObjectId = require('mongodb').ObjectID;
    database.collection('plats').findOneAndUpdate({_id: new ObjectID(id) },{$set:plat}),(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});





app.get("/api/plats-restos/:id_resto", function (req, res) {
    var id=req.params.id_resto;
    console.log(id);
    database.collection('plats').find({id_resto: id,deleted:"non"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","resto": data});
        }
    });
});

app.get("/api/plats-restos-ekaly/:id_resto", function (req, res) {
    var id=req.params.id_resto;
    console.log(id);
    database.collection('plats').find({id_resto: id,visibilite:"oui",deleted:"non"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","resto": data});
        }
    });
});


app.get("/api/plats-restos-ekalys/:nom_resto", function (req, res) {
    var nom=req.params.nom_resto;
    console.log(nom);
    database.collection('plats').find({nom_resto: nom,visibilite:"oui",deleted:"non"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","resto": data});
        }
    });
});


app.get("/api/plats-delete-ekaly/:id/:option", function (req, res) {
    var id=req.params.id;
    var option=req.params.option;
        //updateOne({email:mail},{$set:{ekaly:option}}
        database.collection('plats').updateOne({ _id: new ObjectID(id)},{$set:{visibilite:option}} , function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete plat.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    
});


app.get("/api/plats-update-ekaly/:id", function (req, res) {
  
    //updateOne({email:mail},{$set:{ekaly:option}}
    database.collection('plats').updateOne({ _id: new ObjectID(req.params.id)},{$set:{deleted:"oui"}} , function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete plat.");
        } else {
            res.status(200).json(req.params.id);
        }
    });

});











//Insert plats
app.post("/api/plats", function (req, res) {
    var plats = req.body;


        database.collection('plats').insertOne(plats, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});




//Login

function createToken(mail)
{
    var salted=mail+Date.now();
    var token=md5(salted);
    return token;

}

console.log(createToken("tonio@gmail.com"));

console.log(new Date());
app.post("/api/users/login", function (req, res) {
    var user = req.body;
    console.log("email="+user.email);
    console.log("mdp="+user.mdp);
    database.collection('user').findOne({ email: user.email,mdp:user.mdp })
        .then(quotes => {
          
          if(quotes!=null){
            var id_user=quotes["_id"];
            var noms=quotes["nom"]+" "+quotes["prenom"];
            var profil=quotes["profil"];
            var token=createToken(user.mail);
            var zao=new Date().getTime();
            var expire=(10*60)*1000;

            database.collection('token').deleteMany({ id_user: new ObjectID(id_user) }, function (err, result) {
                if (err) {
                    manageError(res, err.message, "Failed to delete product.");
                } else {
                    
                }
            });

            database.collection('token').insertOne({id_user:id_user,token:token,expire:expire,date:zao}, function (err, doc) {
                if (err) {
                    manageError(res, err.message, "Failed to create new product.");
                } else {
                   // res.status(201).json(doc.ops[0]);
                   
                   res.status(200).json({ "status":"OK","token": token ,"id_user":id_user,"nom":noms,"email":user.email,"profil":profil});
                }
            });
           
          }
          else{
            res.status(200).json({ "status":"NON","message": "Email ou Mot de passe incorrect"});
          }


        })
});


app.delete("/api/users/token/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection("token").deleteOne({ id_user: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});


//Insert user
app.post("/api/users", function (req, res) {
    var user = req.body;


        database.collection('user').insertOne(user, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});




//Check mail exist
app.get('/api/users/:mail', (req, res) => {
    var mail=req.params.mail;
    var ObjectId = require('mongodb').ObjectID;
    database.collection('user').findOne({ email: mail })
      .then(quotes => {
        res.status(200).json(quotes);
      })
      .catch(/* ... */)
  })

  app.get('/api/users/token/:token', (req, res) => {
    var token=req.params.token;
    var ObjectId = require('mongodb').ObjectID;
    database.collection('token').findOne({ token: token })
      .then(quotes => {
        if(!quotes)
        {
            res.status(200).json({"message":"not connected"});
        }
        else{
            res.status(200).json(quotes);
        }
        
      })
      .catch(/* ... */)
  })



//Insert Commandes
app.post("/api/Commandes", function (req, res) {
    var commande = req.body;
        database.collection('commandes').insertOne(commande, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});

//Commandes en cours user
app.get("/api/Commandes-user-en-cours/:id_user", function (req, res) {
    var id=req.params.id_user;
    //var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes').find({id_user:id,etat:"en_cours"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

//Commandes en cours
app.get("/api/Commandes-en-cours", function (req, res) {
    var id=req.params.id_user;
    //var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes').find({etat:"en_cours"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});








//Get Livreur
app.get("/api/Livreur", function (req, res) {
    database.collection('user').find({profil:"livreur",ekaly:"oui"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});


//Insert Commandes
app.post("/api/Commandes/Livreur", function (req, res) {
    var commande = req.body;
        database.collection('commandes_livreur').insertOne(commande, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});





//Get commande a livrer par livreur
app.get("/api/Commandes_pour_livreur/:id_user", function (req, res) {
    let id_livreur=req.params.id_user;
    database.collection('commandes_livreur').find({id_livreur:id_livreur,etat:"livre"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});


//Livraison commande  
app.get("/api/Commandes-update/:id", function (req, res) {
    var id=req.params.id;
    //var plat = req.body;
   // console.log(id);
    var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes').findOneAndUpdate({_id: new ObjectID(id) },{$set:{etat:"paye"}}),(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({"message":"Commande ok"});
        }
    });
});





app.get("/api/Commandes-update-livraison/:id", function (req, res) {
    var id=req.params.id;
    //var plat = req.body;
   // console.log(id);
    var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes_livreur').findOneAndUpdate({_id: new ObjectID(id) },{$set:{etat:"paye"}}),(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({"message":"Commande ok"});
        }
    });
});



app.post("/api/user/sendmail/:email", function (req, res) {
    var user = req.params.email;
    var dat=req.body;
    console.log(user);
   
    sendMail(user,dat,info=>{
        console.log('mail envoye avec succes');
        console.log(dat);
        res.send(info);
    });
});

async function sendMail(email,dat, callback) {
    var transporter =nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: 'ekalyrestaurant@gmail.com',
            pass: '#Ekaly10'
        }
    });
    let mailOptions={
        from: 'ekalyrestaurant@gmail.com',
        to:email,
        subject:"Commande plat : Ekaly",
        html:'<h1>Commande plat: '+dat.plat+'<br> Quantite : '+dat.quantite+'<br> Restaurant :'+dat.resto+' <br> Prix : '+dat.prix+' Ar  </h1></a><br><h3>merci de nous avoir rejoint</h3>'
    };

    let info= await transporter.sendMail(mailOptions);

    callback(info);
}


//Benefice resto
app.get("/api/Commandes-benefice-resto/:id_resto", function (req, res) {
    var id=req.params.id_resto;
    //var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes').find({id_resto:id,etat:"paye"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});



app.get("/api/Commandes-benefice-ekaly", function (req, res) {
    //var id=req.params.id_resto;
    //var ObjectId = require('mongodb').ObjectID;
    database.collection('commandes').find({etat:"paye"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});


app.get("/api/plats-recherche/:nom_resto/:nom_plat", function (req, res) {
    var nom=req.params.nom_resto;
    var plat=req.params.nom_plat;
    console.log(nom);
    database.collection('plats').find({nom_resto: nom,nom_plat:plat,visibilite:"oui",deleted:"non"}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json({ "status":"OK","resto": data});
        }
    });
});






// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}