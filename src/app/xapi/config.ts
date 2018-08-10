import { LRSConfig } from '../../assets/types/lrs-config';
import { StatementAgent } from './statement.model';

export const UaConfig: LRSConfig = {
    endpoint: 'https://cloud.scorm.com/tc/L2ID7I0E29/sandbox/',
    user: 'jec21@alu.ua.es',
    password: 'WG0JJZUI'
};

export const UaBaseURI = 'https://www.ua.es/tfgJorgeEspinosa';

export const UaAgent: StatementAgent = {
    mbox: 'mailto:jec21@alu.ua.es',
    name: 'Jorge Espinosa',
    objectType: 'Agent'
};
