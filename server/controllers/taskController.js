const { prisma } = require("../lib/lib");

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const createTask = await prisma.tasks.create({
            data: {
                title: title,
                description: description,
                userId : req.userId
            }
        })
        if (!createTask) {
            return res.status(404).json({
                status: false,
                message: 'task not create'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'task Created'
        })
    } catch (error) {
        console.log('Error Creating task', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const id = req.params.id;
        const updateTask = await prisma.tasks.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                status : status
            }
        })

        if (!updateTask) {
            return res.status(404).json({
                status: false,
                message: 'task not update'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'task updated'
        })

    } catch (error) {
        console.log('Error updating task', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.getTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const getTasks = await prisma.tasks.findMany({ where: { userId: userId } });
        if (getTasks.length == [] || getTasks.length < 0) {
            return res.status(404).json({ status: false, message: 'Not Founded tasks' })
        }
        return res.status(200).json({ status: true, getTasks })
    } catch (error) {
        console.log('Error fetching tasks', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTask = await prisma.tasks.delete({
            where: {
                id: id
            }
        })

        if (!deleteTask) {
            return res.status(404).json({ status: false, message: 'task not delete' })
        }
        return res.status(200).json({ status: true, message: 'task  deleted' })
    } catch (error) {
        console.log('Error deleting task', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}