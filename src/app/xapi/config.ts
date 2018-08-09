import { LRSConfig } from '../../assets/types/lrs-config';
import { XapiAgent } from '../../assets/types/xapiAgent';

export const UaConfig: LRSConfig = {
    endpoint: 'https://cloud.scorm.com/tc/L2ID7I0E29/sandbox/',
    user: 'jec21@alu.ua.es',
    password: 'WG0JJZUI'
};

export const UaBaseURI = 'https://www.ua.es/tfgJorgeEspinosa';

export const UaAgent: XapiAgent = {
    mbox: 'mailto:jec21@alu.ua.es',
    name: 'Jorge Espinosa',
    objectType: 'Agent'
};
