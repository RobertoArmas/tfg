import { LRSConfig } from '../../assets/types/lrs-config';
import { XapiAgent } from '../../assets/types/xapiAgent';

export const AtnovaConfig: LRSConfig = {
    endpoint: 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/',
    user: 'jespinosa@atnova.com',
    password: 'pedag0g1c0'
};

export const AtnovaBaseURI = 'https://www.atnova.com/mindstair';

export const AtnovaAgent: XapiAgent = {
    mbox: 'mailto:jespinosa@atnova.com',
    name: 'Jorge Espinosa',
    objectType: 'Agent'
}
