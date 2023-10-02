import { waiting } from '@/assets/icons/aguardando';
import { concluded } from '@/assets/icons/concluido';
import { notProgram } from '@/assets/icons/nao_programado';
import { late } from '@/assets/icons/nao_programado_atraso';
import { program } from '@/assets/icons/programado';

export const statusStyle = {
  COMPLETED: '#5AB116',
  IN_PROGRESS: '#034780',
  PENDING: '#D9A900',
  RETURNED: '#CA133F',
};

export const statusIcon = {
  COMPLETED: concluded,
  IN_PROGRESS: program,
  PENDING: notProgram,
  RETURNED: late,
};

export const statusIconTeams = {
  concluded: concluded,
  in_progress: program,
  not_concluded: waiting,
};
