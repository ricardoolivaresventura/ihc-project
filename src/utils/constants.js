export const ACTIONS = [
  {
    value: 'CREATE_TASK',
    name: 'Crear nueva tarea',
  },
  {
    value: 'SAVE_TASK',
    name: 'Guardar tarea',
  },
  {
    value: 'DELETE_TASK',
    name: 'Eliminar tarea',
  },
  {
    value: 'MARK_AS_COMPLETED_TASK',
    name: 'Marcar tarea como completada',
  },
  {
    value: 'MARK_AS_PENDING_TASK',
    name: 'Marcar tarea como pendiente',
  },
];

export const PRIORITIES = [
  {
    value: 'CRITICAL',
    name: 'Crítico',
  },
  {
    value: 'URGENT',
    name: 'Urgente',
  },
  {
    value: 'IMPORTANT',
    name: 'Importante',
  },
  {
    value: 'DEFERRABLE',
    name: 'Aplazable',
  },
  {
    value: 'WITHOUT_IMPORTANCE',
    name: 'Sin importancia',
  },
];
