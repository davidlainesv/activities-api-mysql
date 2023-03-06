const schema = {
    "description": "string",
    "date_time": "date",
    "category": "string",
    "priority": "boolean",
    "student_id": "string"
}

function cast_activity(item) {
    return {
        ...item,
        priority: Boolean(item.priority)
    };
}

function cast_activities(items) {
    return items.map(item => {
        return cast_activity(item);
    });
}

function update_activity(pool, activity_id, update) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                var update_entries = [];
                for (const prop in update) {
                    if (prop != "activity_id") {
                        if (schema[prop] == "string") {
                            entry = `${prop} = '${update[prop]}'`;
                        } else {
                            entry = `${prop} = ${update[prop]}`;
                        }
                        update_entries.push(entry);
                    }
                }
                sql = `
                    UPDATE activities SET 
                    ${update_entries.join(", ")}
                    WHERE activity_id=${activity_id}
                `;

                con.query(sql, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cast_activity(result));
                    }
                    con.release();
                });
            }
        });
    });
}

function select_activity(pool, activity_id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                var sql = "SELECT * FROM activities WHERE activity_id=" + activity_id
                con.query(sql, function (err, results, _fields) {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve(cast_activity(results[0]));
                        } else {
                            reject("Item not found.");
                        }
                    }
                    con.release();
                });
            }
        });
    });
}

function select_activities(pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                var sql = "SELECT * FROM activities"
                con.query(sql, function (err, results, _fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cast_activities(results));
                    }
                    con.release();
                });
            }
        });
    });
}

function insert_activity(pool, activity) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                var sql = `
                    INSERT INTO activities (description, date_time, category, priority, student_id)
                    VALUES ('${activity.description}', '${activity.date_time}', '${activity.category}', '${activity.priority}', '${activity.student_id}')
                `;
                con.query(sql, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cast_activity(result));
                    }
                    con.release();
                });
            }
        });
    });
}

function delete_activity(pool, activity_id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                var sql = `
                    DELETE FROM activities WHERE activity_id = ${activity_id}
                `;
                con.query(sql, function (err, _results, _fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(activity_id);
                    }
                    con.release();
                });
            }
        });
    });
}

module.exports = {
    select_activity: select_activity,
    select_activities: select_activities,
    insert_activity: insert_activity,
    update_activity: update_activity,
    delete_activity: delete_activity
}