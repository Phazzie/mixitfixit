# PowerShell script to generate interface implementations
param(
    [Parameter(Mandatory = $false)]
    [string]$System = "phase",
    [Parameter(Mandatory = $false)]
    [string]$Component = "PhaseManager"
)

function Generate-Interface {
    param($System, $Component)
    
    $interfacePath = "src\$System\interfaces\I$Component.ts"
    $implementationPath = "src\$System\implementations\$Component\$Component.ts"
    $typesPath = "src\$System\implementations\$Component\types.ts"
    $errorsPath = "src\$System\implementations\$Component\errors.ts"
    $testPath = "src\$System\implementations\$Component\$Component.test.ts"

    # Generate types
    @"
export type ${Component}Config = {
    readonly id: string;
    readonly name: string;
};

export type ${Component}State = {
    readonly isReady: boolean;
    readonly error?: Error;
};
"@ | Out-File -FilePath $typesPath -Encoding UTF8

    # Generate errors
    @"
export class ${Component}Error extends Error {
    constructor(message: string) {
        super(message);
        this.name = '${Component}Error';
    }
}

export class ${Component}ValidationError extends ${Component}Error {
    constructor(message: string) {
        super(`Validation Error: ${message}`);
    }
}
"@ | Out-File -FilePath $errorsPath -Encoding UTF8

    # Generate interface
    @"
import { ${Component}Config, ${Component}State } from '../implementations/$Component/types';

export interface I$Component {
    readonly state: ${Component}State;
    initialize(config: ${Component}Config): Promise<void>;
    validate(data: unknown): Promise<boolean>;
    execute(): Promise<void>;
    cleanup(): Promise<void>;
}
"@ | Out-File -FilePath $interfacePath -Encoding UTF8

    # Generate implementation
    @"
import { I$Component } from '../../interfaces/I$Component';
import { ${Component}Config, ${Component}State } from './types';
import { ${Component}Error, ${Component}ValidationError } from './errors';

export class $Component implements I$Component {
    private config: ${Component}Config | null = null;
    private _state: ${Component}State = { isReady: false };

    get state(): ${Component}State {
        return this._state;
    }

    async initialize(config: ${Component}Config): Promise<void> {
        try {
            await this.validate(config);
            this.config = config;
            this._state = { isReady: true };
        } catch (error) {
            this._state = { isReady: false, error: error as Error };
            throw error;
        }
    }

    async validate(data: unknown): Promise<boolean> {
        if (!data || typeof data !== 'object') {
            throw new ${Component}ValidationError('Invalid data structure');
        }
        return true;
    }

    async execute(): Promise<void> {
        if (!this.config || !this._state.isReady) {
            throw new ${Component}Error('Component not initialized');
        }
        // Implementation here
    }

    async cleanup(): Promise<void> {
        this.config = null;
        this._state = { isReady: false };
    }
}
"@ | Out-File -FilePath $implementationPath -Encoding UTF8

    # Generate test
    @"
import { $Component } from './$Component';
import { ${Component}Error, ${Component}ValidationError } from './errors';
import { ${Component}Config } from './types';

describe('$Component', () => {
    let component: $Component;
    let validConfig: ${Component}Config;

    beforeEach(() => {
        component = new $Component();
        validConfig = {
            id: 'test-id',
            name: 'test-name'
        };
    });

    describe('initialize', () => {
        it('should initialize with valid config', async () => {
            await component.initialize(validConfig);
            expect(component.state.isReady).toBe(true);
            expect(component.state.error).toBeUndefined();
        });

        it('should throw on invalid config', async () => {
            await expect(component.initialize({} as ${Component}Config))
                .rejects
                .toThrow(${Component}ValidationError);
        });
    });

    describe('execute', () => {
        it('should throw if not initialized', async () => {
            await expect(component.execute())
                .rejects
                .toThrow(${Component}Error);
        });
    });

    describe('cleanup', () => {
        it('should reset state', async () => {
            await component.initialize(validConfig);
            await component.cleanup();
            expect(component.state.isReady).toBe(false);
        });
    });
});
"@ | Out-File -FilePath $testPath -Encoding UTF8

    Write-Host "✓ Generated implementation for $Component in $System system" -ForegroundColor Green
}

# Generate implementation for specified component
Generate-Interface -System $System -Component $Component

Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review generated files in src\$System" -ForegroundColor Yellow
Write-Host "2. Implement specific logic in $Component.ts" -ForegroundColor Yellow
Write-Host "3. Add more test cases in $Component.test.ts" -ForegroundColor Yellow
Write-Host "4. Run tests to verify implementation" -ForegroundColor Yellow
