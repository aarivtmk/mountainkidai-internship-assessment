// meall object
//  meal={
// calories:200,
// protein:15,
// fiber:5,
// scalefactor:1.5,}

// function score(meal){
// return(meal.calories+meal.protein+meal.fiber)*meal.scalefactor
// }

// const total=[]
// for (let i=0;i<10000;i++){
//     total.push({
//         calories:Math.floor(Math.random()*500),
//         protein:Math.floor(Math.random()*500),
//         fiber:Math.floor(Math.random()*500),
//         scalefactor:Math.floor(Math.random()*500)
//     })
// }
// const scores = total.map(score);



const express = require("express");
const app = express();
const port=3000;
app.use(express.json()); 

function score(meal) {
    return (meal.calories + meal.protein + meal.fiber) * meal.scalefactor;
}


app.post("/home", (req, res) => {
    const meal = req.body;  
    const scores = score(meal);  
    res.json({ scores });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})





