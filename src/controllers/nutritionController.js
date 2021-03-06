const nutritionQueries = require("../db/queries.nutritions.js");
const Nutrition = require("../../src/db/models").Nutrition;
const User = require("../../src/db/models").User;

module.exports = {
    create(req, res, next){
        let newNutrition = {
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            activity: parseFloat(req.body.activity),
            userId: req.params.id,
            calories: Math.round(((10 * (req.body.weight / 2.2) + (6.25 * (req.body.height * 2.54)) - (5 * req.body.age))))
        };
        nutritionQueries.getNutrition(req.params.id, (err, nutrition) => {
            if(nutrition == null){
                nutritionQueries.addNutrition(newNutrition, (err, nutrition) => {
                    if(err){
                        console.log(err);
                        res.redirect(500, `/users`);
                    } else {
                        console.log(newNutrition);
                        res.redirect(303, `/users/${req.params.id}/nutrition`);
                    }
                });
            } else {
                nutritionQueries.editNutrition(req.params.id, newNutrition, (err, nutrition) => {
                    if(err){
                        console.log(err);
                        res.redirect(500, `/users`);
                    } else {
                        console.log(newNutrition);
                        res.redirect(303, `/users/${req.params.id}/nutrition`);
                    }
                });
            }
        });
    },
    show(req, res, next){
        nutritionQueries.getNutrition(req.params.id, (err, nutrition) => {
            console.log("-----nutrition log-----");
            console.log(nutrition);
            if(err || nutrition == null){
                res.redirect(404, "/");
            } else {
                res.render('nutrition/show', {nutrition});
            }
        });
    }
}