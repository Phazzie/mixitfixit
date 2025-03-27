#!/bin/bash
mkdir -p src/{phase,state,config,validation,logging,cache,api,auth}/{interfaces,implementations,tests}
touch src/phase/interfaces/IPhaseManager.ts
touch src/state/interfaces/IStateManager.ts
touch src/config/interfaces/IConfigManager.ts
touch src/validation/interfaces/IValidator.ts
touch src/logging/interfaces/ILogger.ts
touch src/cache/interfaces/ICacheManager.ts
touch src/api/interfaces/IApiClient.ts
touch src/auth/interfaces/IAuthManager.ts

