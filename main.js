const STATUS_TO_DO = 'To Do'
const STATUS_IN_PROGRESS = 'In Progress'
const STATUS_DONE = 'Done'
const PRIORITY_LOW = 'low'
const PRIORITY_HIGH = 'high';

const list = []

let idCounter = 0;

function getTaskIndexById(taskId) {
   return list.findIndex(function (el) {
        return el.id === taskId
    })
}

function addTask(taskName, priority = PRIORITY_LOW) {
    list.push({
        id: ++idCounter,
        name: taskName,
        status: STATUS_TO_DO,
        priority: priority
    })
}

function deleteTask(taskId) {
    const taskIndex = getTaskIndexById(taskId)
    const isTaskFound = taskIndex !== -1

    if (isTaskFound) {
        list.splice(taskIndex, 1)
    }
}

function changeStatus(taskId, status = STATUS_TO_DO) {
    const isValidStatus = (status === STATUS_TO_DO || status === STATUS_IN_PROGRESS || status === STATUS_DONE)
    const taskIndex = getTaskIndexById(taskId)
    const isTaskFound = taskIndex !== -1

    if (!isTaskFound) {
        console.log(`${taskId}, not in list`)
        return;
    }

    if(isValidStatus) {
        list[taskIndex].status = status;
        return;
    }

    console.log(`${status} is unknown status! Try: ${STATUS_TO_DO}, ${STATUS_IN_PROGRESS}, ${STATUS_DONE}` )
}

function showBy(groupBy) {
    function selectTasksByStatus(status) {
        let tasksByStatus = ''

        for (let key of list) {
            if (key.status === status) { tasksByStatus += `  ID:${key.id} "${key.name}" - Priority: ${key.priority}\n` }
        }

        if (!tasksByStatus) { tasksByStatus += '  -\n' }

        return tasksByStatus
    }
    function selectTasksByPriority(priority) {
        let tasksByPriority = ''

        for (let key of list) {
            if (key.priority === priority) { tasksByPriority += `  ID:${key.id} "${key.name}" - Status: ${key.status}\n` }
        }

        if (!tasksByPriority) { tasksByPriority += '  -\n' }

        return tasksByPriority
    }

    if (groupBy === 'status') {
        let toDoTasks = selectTasksByStatus(STATUS_TO_DO)
        let inProgressTasks = selectTasksByStatus(STATUS_IN_PROGRESS)
        let doneTasks = selectTasksByStatus(STATUS_DONE)

        console.log(`${STATUS_TO_DO}:\n${toDoTasks}${STATUS_IN_PROGRESS}:\n${inProgressTasks}${STATUS_DONE}:\n${doneTasks}`)
        return
    }

    if (groupBy === 'priority') {
        let highPriorityTasks = selectTasksByPriority(PRIORITY_HIGH)
        let lowPriorityTasks = selectTasksByPriority(PRIORITY_LOW)

        console.log(`Priority ${PRIORITY_HIGH}:\n${highPriorityTasks}Priority ${PRIORITY_LOW}:\n${lowPriorityTasks}`)
        return;
    }

    console.log(`i don't know how to show by ${groupBy}`)
}



addTask('wrong task')
deleteTask(1)
addTask('Сделать TODO на массиве объектов', PRIORITY_HIGH)
addTask('Сходить в магазин', PRIORITY_HIGH)
addTask('попить лимонад', PRIORITY_LOW)
addTask('Просто таск чтобы был')
changeStatus(4, STATUS_IN_PROGRESS)
changeStatus(2, STATUS_DONE)

showBy('priority')
console.log('-------------------')
showBy('status')