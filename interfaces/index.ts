import { ENUM_SCREENS_NAMES } from '../constants';

export type RootStackParamList = {
    [ENUM_SCREENS_NAMES.LOGIN]: undefined;
};

export interface MessageExternalReturn {
    message: string;
}
