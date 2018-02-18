SELECT DISTINCT status FROM tasks ORDER BY status ASC;

SELECT project_id, COUNT(*) FROM tasks GROUP BY project_id ORDER BY COUNT(*) DESC;

SELECT projects.name, COUNT(*) FROM tasks INNER JOIN projects ON projects.id = tasks.project_id GROUP BY tasks.project_id ORDER BY projects.name;

SELECT name FROM tasks where name like 'N%';

SELECT projects.name, COUNT(tasks.id) FROM projects LEFT JOIN tasks ON projects.id = tasks.project_id where projects.name LIKE '%a%' GROUP BY tasks.project_id 
UNION ALL 
SELECT projects.name, COUNT(tasks.id) FROM tasks LEFT JOIN projects ON projects.id = tasks.project_id where projects.id is NULL ORDER BY projects.name;

SELECT name FROM tasks GROUP BY name HAVING COUNT(name) > 1 ORDER BY name;

SELECT tasks.name, COUNT(*) FROM tasks INNER JOIN projects ON projects.id = tasks.project_id where projects.name like '%Garage%' GROUP BY tasks.name, tasks.status HAVING COUNT(tasks.name) > 1 and COUNT (tasks.status) > 1;

SELECT projects.name, COUNT(*) FROM tasks INNER JOIN projects ON projects.id = tasks.project_id WHERE tasks.status="completed" GROUP BY tasks.project_id HAVING COUNT(*) > 10 ORDER BY projects.id;