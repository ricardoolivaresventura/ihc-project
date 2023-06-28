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

export const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export const VOICE_COMMANDS = [
  {
    value: 'CREATE_NEW_TASK',
    name: 'Crear nueva tarea',
    description: 'Abrir el formulario para crear una nueva tarea',
  },
  {
    value: 'MARK_AS_COMPLETED',
    name: 'Marcar como completada',
    description:
      'Marca una tarea como completada. Este comando de voz funciona desde la página de una tarea',
  },
  {
    value: 'CREATE_NEW_CATEGORY',
    name: 'Crear nueva categoría',
    description: 'Abrir el formulario para crear una nueva categoría',
  },
  {
    value: 'DELETE_TASK',
    name: 'Eliminar tarea',
    description: 'Elimina una tarea. Este comando de voz funciona desde la página de una tarea',
  },
  {
    value: 'SAVE_NEW_TASK',
    name: 'Guardar tarea',
    description: 'Guarda la nueva tarea que introdujiste en el formulario de nueva tarea',
  },
  {
    value: 'SAVE_CHANGES',
    name: 'Guardar cambios',
    description:
      'Guarda los cambios realizados a una tarea. Este comando de voz funciona desde la página de una tarea',
  },
  {
    value: 'SAVE_NEW_CATEGORY',
    name: 'Guardar categoría',
    description: 'Guarda la nueva categoría que introdujiste en el formulario de nueva categoría',
  },
  {
    value: 'CLOSE_MODAL',
    name: 'Cerrar modal',
    description: 'Cierra el modal que se encuentra abierto en ese instante',
  },
];
