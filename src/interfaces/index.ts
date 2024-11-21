import { ENUM_SCREENS_NAMES } from '../constants';

export type RootStackParamList = {
    [ENUM_SCREENS_NAMES.LOGIN]: undefined;
    [ENUM_SCREENS_NAMES.MAP]: undefined;
};

export interface MessageExternalReturn {
    message: string;
}
