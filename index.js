const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");


admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.get('/data/:temperature/:humidity/:id', (req, res) => {
    const date = new Date();
    const { temperature, humidity, id } = req.params;

    // Assuming you would want to do something with the data
    // For now, just logging it
    console.log('Received Temperature:', temperature);
    console.log('Received Humidity:', humidity);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: false
    };

    options.timeZone = "UTC";
    options.timeZoneName = "short";
    console.log(date.toLocaleString("en-US", options));

    const json = 
            {
                Temperature: temperature,
                Humidity: humidity,
                Date: date
            }

        const ref = db.collection("Farm-Stats").doc(id);
        
            ref.update({
                [`farmShade${id}`]: admin.firestore.FieldValue.arrayUnion(json)
            }).catch(function(err){
                if(err.code == 5){
                    console.trace(err);
                    ref.set({
                        [`farmShade${id}`]: json
                    });
                }
            });
        
            
        
        

    // Respond with a success message
    res.status(200).json(json);
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})