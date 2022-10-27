let fs = require('fs');





let getDbStudents= ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('./db.json', 'utf-8', (err, data)=>{
            let students = JSON.parse(data);
            resolve(students)
        })
    })
}

let insertDbStudents = (students)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile('./db.json', JSON.stringify(students), (err)=>{
            resolve("data insert success")
        })
    })

}




module.exports.getDbStudents = getDbStudents
module.exports.insertDbStudents = insertDbStudents