const path = require("path");
const rootDir = require('../../utils/path');
const fs = require("fs");

exports.getList = (req, res) => {
	const user_id = req.headers.authorization;
  const file = path.join(rootDir, "data", "tasks.json");
	fs.readFile(file, (err, taskList) => {
		let tasks = [];
		if(!err && taskList) {
			tasks = JSON.parse(taskList);
		}

		if(tasks.length > 0) {
			return res.send({ status: true, data: tasks.filter(task => task.user_id === user_id) })
		}
		return res.send({ status: true, message: "No records found." });
	});
}

exports.addTask = (req, res) => {
	const user_id = req.headers.authorization;
	const file = path.join(rootDir, "data", "tasks.json");

	fs.readFile(file, (err, taskList) => {
		let tasks = [];
		if(!err && taskList) {
			tasks = JSON.parse(taskList);
		}

		tasks.push({"id": Date.now(), "message": req.body.message, "due": req.body.date, "user_id": user_id});

		fs.writeFile(file, JSON.stringify(tasks), (err) => {
			if(err) {
				console.log("Task creation issue.");
				return res.send({ status: false, message: "Task creation has some problem. Please try after sometime." });
			}
			return res.send({ status: true, message: "New task has been created successfully." });
		});
	})
}

exports.getTask = (req, res) => {
	const user_id = req.headers.authorization;
	const taskId = req.params.id;
	const file = path.join(rootDir, 'data', 'tasks.json');
	fs.readFile(file, (err, fileContent) => {
		if(err) {
			return res.send({ status: false, message: 'Failed to retrive you task. Please try after sometime.' });
		}
		let tasks = JSON.parse(fileContent);
		tasks = tasks.filter(task => task.user_id === user_id)

		const isTaskExist = tasks.find(task => task.id == taskId);
		if(isTaskExist !== undefined) {
			return res.send({ status: true, data: isTaskExist });
		} else {
			return res.send({ status: false, message: 'Task doesn\'t exist.' });
		}
	});
}

exports.updateTask = (req, res) => {
	const user_id = req.headers.authorization;
	const taskId = req.params.id;
	const file = path.join(rootDir, 'data', 'tasks.json');
	fs.readFile(file, (err, fileContent) => {
		if(err) {
			return res.send({ status: false, message: 'Task update has some issue. Please try after sometime.' });
		}
		let tasks = JSON.parse(fileContent);
		tasks = tasks.filter(task => task.user_id === user_id)

		const taskItemIndex = tasks.findIndex(item => item.id ==  taskId);
		if(0 > taskItemIndex) {
			return res.send({ status: false, message: 'Task doesn\'t exist.' });
		}

		tasks[taskItemIndex].message = req.body.message;
		tasks[taskItemIndex].due = req.body.date;

		fs.writeFile(file, JSON.stringify(tasks), (err) => {
			if(err) {
				return res.send({ status: false, message: "Task update has some issue. Please try after sometime." });
			}
			return res.send({ status: true, message: "Task has been updated successfully." });
		});
	});
}

exports.deleteTask = (req, res) => {
	const user_id = req.headers.authorization;
	const taskId = req.params.id;
	const file = path.join(rootDir, 'data', 'tasks.json');
	fs.readFile(file, (err, fileContent) => {
		if(err) {
			return res.send({ status: false, message: 'Task delete has some issue. Please try after sometime.' });
		}

		let tasks = JSON.parse(fileContent);
		tasks = tasks.filter(task => { console.log(task.user_id, user_id); return task.user_id == user_id});

		const taskItemIndex = tasks.findIndex(item => item.id ==  taskId);
		if(0 > taskItemIndex) {
			return res.send({ status: false, message: 'Task doesn\'t exist.' });
		}

		tasks.splice(taskItemIndex, 1);

		fs.writeFile(file, JSON.stringify(tasks), (err) => {
			if(err) {
				return res.send({ status: false, message: "Task delete has some issue. Please try after sometime." });
			}
			return res.send({ status: true, message: "Task has been deleted successfully." });
		});
	});
}

exports.updateTaskStatus = (req, res) => {
	const user_id = req.headers.authorization;
	const taskId = req.params.id;
	const file = path.join(rootDir, 'data', 'tasks.json');
	fs.readFile(file, (err, fileContent) => {
		if(err) {
			return res.send({ status: false, message: 'Task status update has some issue. Please try after sometime.' });
		}
		let tasks = JSON.parse(fileContent);
		tasks = tasks.filter(task => task.user_id === user_id)

		const taskItemIndex = tasks.findIndex(item => item.id ==  taskId);
		if(0 > taskItemIndex) {
			return res.send({ status: false, message: 'Task doesn\'t exist.' });
		}

		const taskStatus = req.body.status;
		if(taskStatus != 1 && taskStatus != 2) {
			return res.send({ status: false, message: 'Unknown task status.' });
		}

		tasks[taskItemIndex].status = req.body.status;
		fs.writeFile(file, JSON.stringify(tasks), (err) => {
			if(err) {
				return res.send({ status: false, message: "Task status update has some issue. Please try after sometime." });
			}
			return res.send({ status: true, message: (taskStatus == 1 ? "Task has been completed successfully." : "Task has been reopend successfully." )});
		});
	});
}