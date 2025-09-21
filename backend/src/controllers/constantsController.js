import { TASKSTATUS_VALUES } from '../constants/taskStatus.js';
import { RECURRENCE_VALUES } from '../constants/recurrence.js';


export const getConstants = async (req, res) => {
  try {
    res.json({
      taskStatus: TASKSTATUS_VALUES,
      recurrence: RECURRENCE_VALUES,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};