import { ENUM_SCREENS_NAMES } from '../constants';

export type RootStackParamList = {
    [ENUM_SCREENS_NAMES.LOGIN]: undefined;
    [ENUM_SCREENS_NAMES.MAP]: undefined;
    [ENUM_SCREENS_NAMES.CHAT]: undefined;
};

export interface MessageExternalReturn {
    message: string;
}
