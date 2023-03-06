const pool = require('./database.js');
const activities_mysql = require('./activities_mysql.js');
const students_mysql = require('./students_mysql.js');
const { format_datetime } = require('./utils.js');


async function main() {
    try {
        const students = await students_mysql.select_students(pool);
        console.log("students", students);
        if (students.length == 0) {
            student_created = await students_mysql.insert_student(pool, {
                name: 'David Laines',
                active: 1,
                email: 'a00835351@tec.mx',
                notes: 'Teaching Assistant'
            });
            console.log("created", student_created);
        }

        const activities = await activities_mysql.select_activities(pool);
        console.log("activities", activities);
        if (activities.length == 0) {
            const activity_created = activities_mysql.insert_activity(pool, {
                description: 'Actividad #1',
                date_time: format_datetime(new Date()),
                category: 'Any',
                priority: 1,
                student_id: students[0].student_id
            });
            console.log("created", activity_created);
        }
    } catch (error) {
        console.log(error);
    }
}

main();

setTimeout(function() {
    process.exit(0);
}, 1000);