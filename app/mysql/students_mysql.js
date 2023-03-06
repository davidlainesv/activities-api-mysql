function cast_student(student) {
    return {
        ...student,
        active: Boolean(student.active)
    };
}

function cast_students(students) {
    return students.map(student => {
        return cast_student(student);
    });
}

function select_student(pool, id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) reject(err);
            con.query("SELECT * FROM students WHERE student_id=" + id, function (err, results, _fields) {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        resolve(cast_student(results[0]));
                    } else {
                        reject("Item not found.");
                    }
                }
                con.release();
            });
        });
    });
}

function select_students(pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) reject(err);
            con.query("SELECT * FROM students", function (err, results, _fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(cast_students(results));
                }
                con.release();
            });
        });
    });
}


function insert_student(pool, student) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) reject(err);
            var sql = `
                INSERT INTO students (name, active, email, notes)
                VALUES ('${student.name}', ${student.active}, '${student.email}', '${student.notes}')
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(cast_student(result));
                }
                con.release();
            });
        });
    });
}

module.exports = {
    select_student: select_student,
    select_students: select_students,
    insert_student: insert_student
}