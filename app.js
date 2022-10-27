let express = require('express');

let db = require('./db');

let app = express();

app.use(express.json())


app.get('/api/students', (req, res)=>{

    db.getDbStudents()
    .then(students=>{
        res.send(students);
    })

})

app.post('/api/students', (req, res)=>{
    let student = req.body;
    db.getDbStudents()
    .then(students=>{
        students.push(student)
        db.insertDbStudents(students)
        .then(data=>{
            res.send(data)
        })

    })
})


app.get('/api/students/:id', (req, res)=>{
    let id = parseInt (req.params.id);
    db.getDbStudents()
    .then(students=>{
        let student = students.find(s=>s.id ===id)
        if(!student) res.status(404).send("requested id not found")
        else res.send(student)
    })
})

app.put('/api/students/:id', (req, res)=>{
    let id = parseInt (req.params.id);
    let updatedData = req.body;
   
    db.getDbStudents()
    .then(students=>{
        let student = students.find(s=>s.id ===id)
        if(!student) res.status(404).send("requested id not found")
        else {
            let i = students.findIndex(s=> s.id ===id);
            students[i] = updatedData;
            db.insertDbStudents(students)
            .then(msg=>res.send(updatedData))
        }
    })

})

app.delete('/api/students/:id', (req, res)=>{
    let id = parseInt(req.params.id);

    db.getDbStudents()
    .then(students=>{
        let student = students.find(s=> s.id===id);
        if(!student)res.status(404).send("No student found with this id")
        let updatedStudents = students.filter(s=>s.id !== id );
        console.log(updatedStudents)

        db.insertDbStudents(updatedStudents)
        .then(msg=> res.send(student));
    })
})













app.listen(8000, ()=>{
    console.log("server run success");
})