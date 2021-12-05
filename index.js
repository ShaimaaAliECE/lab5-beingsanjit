//sshar374 SE3316 Lab 5

//require express, jobs.json file, make it an express app and use the html file
const express = require('express');
let jobs_in_json = require('./jobs.json');
const app = express();
app.use(express.static('myHTML'));

//Q1:
//initialize object to count jobs in specific categories in the json file. Convert back to json at the end.
app.get('/ListCategories', (req, res) => {
    let categories = {};
    for (let j in jobs_in_json) {
        for (let c of jobs_in_json[j].categories)
            if (!categories[c]) {
                categories[c] = 1;
            }
        else
            categories[c]++;
    }
    res.json(categories);

});

//Q2:
//array to store categories and iterate through the json file
app.get('/:categoryName', (req, res) => {
    let jobCategories = [];
    for (let j in jobs_in_json) {
        if (jobs_in_json[j].categories.includes(req.params.category)) {
            jobCategories.push(j);
        }
    }
    res.json({
        jobs: jobCategories
    })
});

//Q3:
//last array to store jobs, find city name corresponding to job, push to another array and then convert back to json again.
app.get('/ListCities', (req, res) => {
    let jobCities = [];
    for (let j in jobs_in_json) {
        if (jobs_in_json[j].title.includes(req.query.city)) {
            jobCities.push(j);
        }
    }
    res.json({
        jobs: jobCities
    });
});

//listener active at port 80, as instructed
app.listen(80);