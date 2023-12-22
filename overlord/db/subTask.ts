import { Task } from 'server-trpc/db/models'

export const SubTaskUpdate = async (subTaskId: string, updateData: any) => {
  try {
    // Шаг 1: Найти задачу, содержащую подзадачу
    const task = await Task.findOne({ 'subTasks._id': subTaskId })

    if (!task) {
      throw new Error('Task containing the subTask not found')
    }

    // Шаг 2: Обновить подзадачу
    task.subTasks = task.subTasks.map((sub) => {
      if (sub._id.toString() === subTaskId.toString()) {
        return { ...sub, ...updateData }
      } else {
        return sub
      }
    })

    // Сохранение обновлений
    await task.save()
    console.log('SubTask updated successfully')
  } catch (error) {
    console.error('[DB] Error updating subTask:', error)
  }
}

export const SubTaskOnline = async (taskId: string, subTaskId: string) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, 'subTasks._id': subTaskId },
      {
        $inc: { online: 1 },
        $set: { 'subTasks.$.status': 'play' }
      },
      { new: true }
    )
    if (updatedTask) {
      console.log('[DB] SubTaskOnline successfully update')
    } else {
      console.log('[DB] SubTaskOnline successfully not update')
    }
  } catch (error) {
    console.error('[DB] SubTaskOnline Error:', error)
  }
}

export const SubTaskPause = async (taskId: string, subTaskId: string) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, 'subTasks._id': subTaskId, online: { $gt: 0 } }, // Дополнительное условие, чтобы избежать отрицательного значения
      {
        $inc: { online: -1 }, // Уменьшаем счетчик online на 1
        $set: { 'subTasks.$.status': 'pause' } // Изменяем статус на offline
      },
      { new: true }
    )

    if (updatedTask) {
      console.log('[DB] SubTaskPause successfully update')
    } else {
      console.log('[DB] SubTaskPause successfully not update')
    }
  } catch (error) {
    console.error('[DB] SubTaskPause Error:', error)
  }
}

export const SubTaskDone = async (taskId: string, subTaskId: string) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, 'subTasks._id': subTaskId, online: { $gt: 0 } }, // Дополнительное условие, чтобы избежать отрицательного значения
      {
        $inc: { online: -1 }, // Уменьшаем счетчик online на 1
        $set: { 'subTasks.$.status': 'done' } // Изменяем статус на offline
      },
      { new: true }
    )

    if (updatedTask) {
      console.log('[DB] SubTaskDone successfully update')
    } else {
      console.log('[DB] SubTaskDone successfully not update')
    }
  } catch (error) {
    console.error('[DB] SubTaskDone Error:', error)
  }
}
