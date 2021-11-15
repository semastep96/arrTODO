const STATUS_TO_DO = 'To Do'
const STATUS_IN_PROGRESS = 'In Progress'
const STATUS_DONE = 'Done'
const PRIORITY_LOW = 'low'
const PRIORITY_HIGH = 'high';

const list = []

let idCounter = 0;

function findTaskIndexByName(taskName) {
   return list.findIndex(function (el) {
        return el.name === taskName
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

function deleteTask(taskName) {
    const taskIndex = findTaskIndexByName(taskName)
    const isTaskFound = taskIndex !== -1

    if (isTaskFound) {
        list.splice(taskIndex, 1)
    }
}

function changeStatus(taskName, status = STATUS_TO_DO) {
    const isValidStatus = (status === STATUS_TO_DO || status === STATUS_IN_PROGRESS || status === STATUS_DONE)
    const taskIndex = findTaskIndexByName(taskName)
    const isTaskFound = taskIndex !== -1

    if (!isTaskFound) {
        console.log(`${taskName}, not in list`)
        return;
    }

    if(isValidStatus) {
        list[taskIndex].status = status;
        return;
    }

    console.log(`${status} is unknown status! Try: ${STATUS_TO_DO}, ${STATUS_IN_PROGRESS}, ${STATUS_DONE}` )
}

function showList(groupBy) {
    function selectTasksByStatus(status) {
        let tasksByStatus = ''

        for (let key of list) {
            if (key.status === status) { tasksByStatus += `  "${key.name}" - Priority: ${key.priority}\n` }
        }

        if (!tasksByStatus) { tasksByStatus += '  -\n' }

        return tasksByStatus
    }
    function selectTasksByPriority(priority) {
        let tasksByPriority = ''

        for (let key of list) {
            if (key.priority === priority) { tasksByPriority += `  "${key.name}" - Status: ${key.status}\n` }
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
deleteTask('wrong task')
addTask('Сделать TODO на массиве объектов', PRIORITY_HIGH)
addTask('Сходить в магазин', PRIORITY_HIGH)
addTask('попить лимонад', PRIORITY_LOW)
addTask('Просто таск чтобы был')
changeStatus('попить лимонад', STATUS_IN_PROGRESS)
changeStatus('Сделать TODO на массиве объектов', STATUS_DONE)

showList('priority')
console.log('-------------------')
showList('status')

console.log(list)
