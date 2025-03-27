import { InputValidatorConfig, InputValidatorState } from '../implementations/InputValidator/types';

export interface IInputValidator {
    readonly state: InputValidatorState;
    initialize(config: InputValidatorConfig): Promise<void>;
    validate(data: unknown): Promise<boolean>;
    execute(): Promise<void>;
    cleanup(): Promise<void>;
}
