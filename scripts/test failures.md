Initial errors:
src/services/ai/IAIAnalyzer.ts(1,3): error TS1005: ';' expected.
src/services/ai/IAIAnalyzer.ts(1,4): error TS1005: ';' expected.
src/services/ai/IAIAnalyzer.ts(1,4): error TS1351: An identifier or keyword cannot immediately follow a numeric literal.

🧪 Running Tests...

> mix-it-fix-it@1.0.0 test
> jest

FAIL src/services/ai/generation/**tests**/ContentGenerator.test.ts
● Test suite failed to run

    src/services/ai/generation/__tests__/ContentGenerator.test.ts:15:27 - error TS2304: Cannot find name 'ContentGenerator'.

    15     const generator = new ContentGenerator(
                                 ~~~~~~~~~~~~~~~~
    src/services/ai/generation/__tests__/ContentGenerator.test.ts:33:49 - error TS2304: Cannot find name 'success'.

    33         mockPromptBuilder.build.mockReturnValue(success(prompt));
                                                       ~~~~~~~
    src/services/ai/generation/__tests__/ContentGenerator.test.ts:50:45 - error TS2304: Cannot find name 'RateLimitError'.

    50         expect(result.error).toBeInstanceOf(RateLimitError);
                                                   ~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseManager/PhaseManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseManager/PhaseManager.test.ts:1:28 - error TS2307: Cannot find module '../../testing/mocks/MockLogger' or its corresponding type declarations.

    1 import { MockLogger } from '../../testing/mocks/MockLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:2:36 - error TS2307: Cannot find module '../../testing/mocks/MockPhaseValidator' or its corresponding type declarations.

    2 import { MockPhaseValidator } from '../../testing/mocks/MockPhaseValidator';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:3:23 - error TS2307: Cannot find module '../../types' or its corresponding type declarations.

    3 import { Phase } from '../../types';
                            ~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:4:38 - error TS2306: File 'C:/Users/thump/NeuralDesigner/mixitfixit/src/phase/implementations/PhaseManager/errors.ts' is not a module.

    4 import { PhaseTransitionError } from './errors';
                                           ~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:10:62 - error TS2554: Expected 0 arguments, but got 2.

    10     logger = new MockLogger();    manager = new PhaseManager(validator, logger);
                                                                    ~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:15:19 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    15     await manager.transitionTo(Phase.DISCUSSION);    expect(manager.getCurrentPhase()).toBe(Phase.DISCUSSION);
                         ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:18:32 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    18     await expect(      manager.transitionTo(Phase.RESOLUTION)
                                      ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:22:23 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    22         await manager.transitionTo(Phase.DISCUSSION, testData);
                             ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:23:35 - error TS2339: Property 'getPhaseData' does not exist on type 'PhaseManager'.

    23     const retrievedData = manager.getPhaseData(Phase.DISCUSSION);
                                         ~~~~~~~~~~~~

FAIL src/navigation/**tests**/NavigationManager.test.ts
● Test suite failed to run

    src/navigation/__tests__/NavigationManager.test.ts:7:25 - error TS2554: Expected 3 arguments, but got 0.

    7     navigationManager = new NavigationManager();
                              ~~~~~~~~~~~~~~~~~~~~~~~

      src/navigation/NavigationManager.ts:13:9
        13         router: Router,
                   ~~~~~~~~~~~~~~
        An argument for 'router' was not provided.
    src/navigation/__tests__/NavigationManager.test.ts:15:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    15     navigationManager.navigate('/test');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:20:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    20     navigationManager.navigate('/test', { id: '123' });
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:21:30 - error TS2339: Property 'getParams' does not exist on type 'NavigationManager'.

    21     expect(navigationManager.getParams()).toEqual({ id: '123' });
                                    ~~~~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:25:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    25     navigationManager.navigate('/first');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:26:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    26     navigationManager.navigate('/second');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:27:30 - error TS2339: Property 'goBack' does not exist on type 'NavigationManager'.

    27     expect(navigationManager.goBack()).toBe(true);
                                    ~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:33:23 - error TS2339: Property 'subscribe' does not exist on type 'NavigationManager'.

    33     navigationManager.subscribe(mockCallback);
                             ~~~~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:34:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    34     navigationManager.navigate('/test');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.

FAIL src/phase/**tests**/PhaseManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseManager.ts:1:31 - error TS2306: File 'C:/Users/thump/NeuralDesigner/mixitfixit/src/phase/interfaces/IPhaseManager.ts' is not a module.

    1 import { IPhaseManager } from '../interfaces/IPhaseManager';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/ai/**tests**/GeminiAnalyzer.test.ts
● Test suite failed to run

    src/services/ai/__tests__/GeminiAnalyzer.test.ts:12:26 - error TS2304: Cannot find name 'GeminiAnalyzer'.

    12     const analyzer = new GeminiAnalyzer(
                                ~~~~~~~~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:33:48 - error TS2304: Cannot find name 'success'.

    33         mockValidator.validate.mockReturnValue(success(expectedAnalysis));
                                                      ~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:46:49 - error TS2304: Cannot find name 'failure'.

    46         mockErrorHandler.handle.mockReturnValue(failure(new GeminiError('API error')));
                                                       ~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:46:61 - error TS2304: Cannot find name 'GeminiError'.

    46         mockErrorHandler.handle.mockReturnValue(failure(new GeminiError('API error')));
                                                                   ~~~~~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:51:45 - error TS2304: Cannot find name 'GeminiError'.

    51         expect(result.error).toBeInstanceOf(GeminiError);
                                                   ~~~~~~~~~~~

FAIL src/services/ai/**tests**/AIAnalyzer.test.ts
● Test suite failed to run

    src/services/ai/__tests__/AIAnalyzer.test.ts:30:23 - error TS2339: Property 'data' does not exist on type 'Result<Analysis>'.
      Property 'data' does not exist on type 'Failure'.

    30         expect(result.data).toEqual(expectedAnalysis);
                             ~~~~

FAIL src/validation/implementations/ValidationRuleEngine/ValidationRuleEngine.test.ts
● Test suite failed to run

    src/validation/implementations/ValidationRuleEngine/ValidationRuleEngine.ts:1:39 - error TS2307: Cannot find module '../../interfaces/IValidationRuleEngine' or its corresponding type declarations.

    1 import { IValidationRuleEngine } from '../../interfaces/IValidationRuleEngine';
                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/ratelimiting/RateLimiter.test.ts
● Test suite failed to run

    src/services/ratelimiting/RateLimiter.test.ts:2:28 - error TS2307: Cannot find module '../../test/mocks/MockLogger' or its corresponding type declarations.

    2 import { MockLogger } from '../../test/mocks/MockLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiResponseHandler/ApiResponseHandler.test.ts
● Test suite failed to run

    src/api/implementations/ApiResponseHandler/ApiResponseHandler.ts:1:37 - error TS2307: Cannot find module '../../interfaces/IApiResponseHandler' or its corresponding type declarations.

    1 import { IApiResponseHandler } from '../../interfaces/IApiResponseHandler';
                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/validation/implementations/ValidationLogger/ValidationLogger.test.ts
● Test suite failed to run

    src/validation/implementations/ValidationLogger/ValidationLogger.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IValidationLogger' or its corresponding type declarations.

    1 import { IValidationLogger } from '../../interfaces/IValidationLogger';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseTransitioner/PhaseTransitioner.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseTransitioner/PhaseTransitioner.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IPhaseTransitioner' or its corresponding type declarations.

    1 import { IPhaseTransitioner } from '../../interfaces/IPhaseTransitioner';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseStateManager/PhaseStateManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseStateManager/PhaseStateManager.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IPhaseStateManager' or its corresponding type declarations.

    1 import { IPhaseStateManager } from '../../interfaces/IPhaseStateManager';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiRequestBuilder/ApiRequestBuilder.test.ts
● Test suite failed to run

    src/api/implementations/ApiRequestBuilder/ApiRequestBuilder.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IApiRequestBuilder' or its corresponding type declarations.

    1 import { IApiRequestBuilder } from '../../interfaces/IApiRequestBuilder';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StatePersistence/StatePersistence.test.ts
● Test suite failed to run

    src/state/implementations/StatePersistence/StatePersistence.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IStatePersistence' or its corresponding type declarations.

    1 import { IStatePersistence } from '../../interfaces/IStatePersistence';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheInvalidator/CacheInvalidator.test.ts
● Test suite failed to run

    src/cache/implementations/CacheInvalidator/CacheInvalidator.ts:1:35 - error TS2307: Cannot find module '../../interfaces/ICacheInvalidator' or its corresponding type declarations.

    1 import { ICacheInvalidator } from '../../interfaces/ICacheInvalidator';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigValidator/ConfigValidator.test.ts
● Test suite failed to run

    src/config/implementations/ConfigValidator/ConfigValidator.ts:1:34 - error TS2307: Cannot find module '../../interfaces/IConfigValidator' or its corresponding type declarations.

    1 import { IConfigValidator } from '../../interfaces/IConfigValidator';
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/auth/implementations/AuthTokenManager/AuthTokenManager.test.ts
● Test suite failed to run

    src/auth/implementations/AuthTokenManager/AuthTokenManager.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IAuthTokenManager' or its corresponding type declarations.

    1 import { IAuthTokenManager } from '../../interfaces/IAuthTokenManager';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateValidator/StateValidator.test.ts
● Test suite failed to run

    src/state/implementations/StateValidator/StateValidator.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IStateValidator' or its corresponding type declarations.

    1 import { IStateValidator } from '../../interfaces/IStateValidator';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseValidator/PhaseValidator.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseValidator/PhaseValidator.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IPhaseValidator' or its corresponding type declarations.

    1 import { IPhaseValidator } from '../../interfaces/IPhaseValidator';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheStrategy/CacheStrategy.test.ts
● Test suite failed to run

    src/cache/implementations/CacheStrategy/CacheStrategy.ts:1:32 - error TS2307: Cannot find module '../../interfaces/ICacheStrategy' or its corresponding type declarations.

    1 import { ICacheStrategy } from '../../interfaces/ICacheStrategy';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiRateLimiter/ApiRateLimiter.test.ts
● Test suite failed to run

    src/api/implementations/ApiRateLimiter/ApiRateLimiter.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IApiRateLimiter' or its corresponding type declarations.

    1 import { IApiRateLimiter } from '../../interfaces/IApiRateLimiter';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateObserver/StateObserver.test.ts
● Test suite failed to run

    src/state/implementations/StateObserver/StateObserver.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IStateObserver' or its corresponding type declarations.

    1 import { IStateObserver } from '../../interfaces/IStateObserver';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigWatcher/ConfigWatcher.test.ts
● Test suite failed to run

    src/config/implementations/ConfigWatcher/ConfigWatcher.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IConfigWatcher' or its corresponding type declarations.

    1 import { IConfigWatcher } from '../../interfaces/IConfigWatcher';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigUpdater/ConfigUpdater.test.ts
● Test suite failed to run

    src/config/implementations/ConfigUpdater/ConfigUpdater.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IConfigUpdater' or its corresponding type declarations.

    1 import { IConfigUpdater } from '../../interfaces/IConfigUpdater';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateUpdater/StateUpdater.test.ts
● Test suite failed to run

    src/state/implementations/StateUpdater/StateUpdater.ts:1:31 - error TS2307: Cannot find module '../../interfaces/IStateUpdater' or its corresponding type declarations.

    1 import { IStateUpdater } from '../../interfaces/IStateUpdater';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigLoader/ConfigLoader.test.ts
● Test suite failed to run

    src/config/implementations/ConfigLoader/ConfigLoader.ts:1:31 - error TS2307: Cannot find module '../../interfaces/IConfigLoader' or its corresponding type declarations.

    1 import { IConfigLoader } from '../../interfaces/IConfigLoader';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheStorage/CacheStorage.test.ts
● Test suite failed to run

    src/cache/implementations/CacheStorage/CacheStorage.ts:1:31 - error TS2307: Cannot find module '../../interfaces/ICacheStorage' or its corresponding type declarations.

    1 import { ICacheStorage } from '../../interfaces/ICacheStorage';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheMonitor/CacheMonitor.test.ts
● Test suite failed to run

    src/cache/implementations/CacheMonitor/CacheMonitor.ts:1:31 - error TS2307: Cannot find module '../../interfaces/ICacheMonitor' or its corresponding type declarations.

    1 import { ICacheMonitor } from '../../interfaces/ICacheMonitor';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiLogger/ApiLogger.test.ts
● Test suite failed to run

    src/api/implementations/ApiLogger/ApiLogger.ts:1:28 - error TS2307: Cannot find module '../../interfaces/IApiLogger' or its corresponding type declarations.

    1 import { IApiLogger } from '../../interfaces/IApiLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseLogger/PhaseLogger.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseLogger/PhaseLogger.ts:1:30 - error TS2307: Cannot find module '../../interfaces/IPhaseLogger' or its corresponding type declarations.

    1 import { IPhaseLogger } from '../../interfaces/IPhaseLogger';
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/logging/implementations/Logger/Logger.test.ts
● Test suite failed to run

    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:133:18)
      at node_modules/@jest/core/build/TestScheduler.js:254:19
      at node_modules/emittery/index.js:363:13
          at Array.map (<anonymous>)
      at Emittery.emit (node_modules/emittery/index.js:361:23)

FAIL src/auth/implementations/AuthLogger/AuthLogger.test.ts
● Test suite failed to run

    src/auth/implementations/AuthLogger/AuthLogger.ts:1:29 - error TS2307: Cannot find module '../../interfaces/IAuthLogger' or its corresponding type declarations.

    1 import { IAuthLogger } from '../../interfaces/IAuthLogger';
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/errors/ErrorMessageProvider.test.ts
● Test suite failed to run

    src/services/errors/ErrorMessageProvider.test.ts:110:33 - error TS2339: Property 'isRecoverable' does not exist on type 'IErrorMessageProvider'.

    110                 expect(provider.isRecoverable(error)).toBe(expected);
                                        ~~~~~~~~~~~~~

----------|---------|----------|---------|---------|-------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files | 0 | 0 | 0 | 0 |  
----------|---------|----------|---------|---------|-------------------
Summary of all failing tests
FAIL src/services/ai/generation/**tests**/ContentGenerator.test.ts
● Test suite failed to run

    src/services/ai/generation/__tests__/ContentGenerator.test.ts:15:27 - error TS2304: Cannot find name 'ContentGenerator'.

    15     const generator = new ContentGenerator(
                                 ~~~~~~~~~~~~~~~~
    src/services/ai/generation/__tests__/ContentGenerator.test.ts:33:49 - error TS2304: Cannot find name 'success'.

    33         mockPromptBuilder.build.mockReturnValue(success(prompt));
                                                       ~~~~~~~
    src/services/ai/generation/__tests__/ContentGenerator.test.ts:50:45 - error TS2304: Cannot find name 'RateLimitError'.

    50         expect(result.error).toBeInstanceOf(RateLimitError);
                                                   ~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseManager/PhaseManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseManager/PhaseManager.test.ts:1:28 - error TS2307: Cannot find module '../../testing/mocks/MockLogger' or its corresponding type declarations.

    1 import { MockLogger } from '../../testing/mocks/MockLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:2:36 - error TS2307: Cannot find module '../../testing/mocks/MockPhaseValidator' or its corresponding type declarations.

    2 import { MockPhaseValidator } from '../../testing/mocks/MockPhaseValidator';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:3:23 - error TS2307: Cannot find module '../../types' or its corresponding type declarations.

    3 import { Phase } from '../../types';
                            ~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:4:38 - error TS2306: File 'C:/Users/thump/NeuralDesigner/mixitfixit/src/phase/implementations/PhaseManager/errors.ts' is not a module.

    4 import { PhaseTransitionError } from './errors';
                                           ~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:10:62 - error TS2554: Expected 0 arguments, but got 2.

    10     logger = new MockLogger();    manager = new PhaseManager(validator, logger);
                                                                    ~~~~~~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:15:19 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    15     await manager.transitionTo(Phase.DISCUSSION);    expect(manager.getCurrentPhase()).toBe(Phase.DISCUSSION);
                         ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:18:32 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    18     await expect(      manager.transitionTo(Phase.RESOLUTION)
                                      ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:22:23 - error TS2339: Property 'transitionTo' does not exist on type 'PhaseManager'.

    22         await manager.transitionTo(Phase.DISCUSSION, testData);
                             ~~~~~~~~~~~~
    src/phase/implementations/PhaseManager/PhaseManager.test.ts:23:35 - error TS2339: Property 'getPhaseData' does not exist on type 'PhaseManager'.

    23     const retrievedData = manager.getPhaseData(Phase.DISCUSSION);
                                         ~~~~~~~~~~~~

FAIL src/navigation/**tests**/NavigationManager.test.ts
● Test suite failed to run

    src/navigation/__tests__/NavigationManager.test.ts:7:25 - error TS2554: Expected 3 arguments, but got 0.

    7     navigationManager = new NavigationManager();
                              ~~~~~~~~~~~~~~~~~~~~~~~

      src/navigation/NavigationManager.ts:13:9
        13         router: Router,
                   ~~~~~~~~~~~~~~
        An argument for 'router' was not provided.
    src/navigation/__tests__/NavigationManager.test.ts:15:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    15     navigationManager.navigate('/test');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:20:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    20     navigationManager.navigate('/test', { id: '123' });
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:21:30 - error TS2339: Property 'getParams' does not exist on type 'NavigationManager'.

    21     expect(navigationManager.getParams()).toEqual({ id: '123' });
                                    ~~~~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:25:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    25     navigationManager.navigate('/first');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:26:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    26     navigationManager.navigate('/second');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.
    src/navigation/__tests__/NavigationManager.test.ts:27:30 - error TS2339: Property 'goBack' does not exist on type 'NavigationManager'.

    27     expect(navigationManager.goBack()).toBe(true);
                                    ~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:33:23 - error TS2339: Property 'subscribe' does not exist on type 'NavigationManager'.

    33     navigationManager.subscribe(mockCallback);
                             ~~~~~~~~~
    src/navigation/__tests__/NavigationManager.test.ts:34:23 - error TS2551: Property 'navigate' does not exist on type 'NavigationManager'. Did you mean 'navigateTo'?

    34     navigationManager.navigate('/test');
                             ~~~~~~~~

      src/navigation/NavigationManager.ts:26:5
        26     navigateTo(path: string): void {
               ~~~~~~~~~~
        'navigateTo' is declared here.

FAIL src/phase/**tests**/PhaseManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseManager.ts:1:31 - error TS2306: File 'C:/Users/thump/NeuralDesigner/mixitfixit/src/phase/interfaces/IPhaseManager.ts' is not a module.

    1 import { IPhaseManager } from '../interfaces/IPhaseManager';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/ai/**tests**/GeminiAnalyzer.test.ts
● Test suite failed to run

    src/services/ai/__tests__/GeminiAnalyzer.test.ts:12:26 - error TS2304: Cannot find name 'GeminiAnalyzer'.

    12     const analyzer = new GeminiAnalyzer(
                                ~~~~~~~~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:33:48 - error TS2304: Cannot find name 'success'.

    33         mockValidator.validate.mockReturnValue(success(expectedAnalysis));
                                                      ~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:46:49 - error TS2304: Cannot find name 'failure'.

    46         mockErrorHandler.handle.mockReturnValue(failure(new GeminiError('API error')));
                                                       ~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:46:61 - error TS2304: Cannot find name 'GeminiError'.

    46         mockErrorHandler.handle.mockReturnValue(failure(new GeminiError('API error')));
                                                                   ~~~~~~~~~~~
    src/services/ai/__tests__/GeminiAnalyzer.test.ts:51:45 - error TS2304: Cannot find name 'GeminiError'.

    51         expect(result.error).toBeInstanceOf(GeminiError);
                                                   ~~~~~~~~~~~

FAIL src/services/ai/**tests**/AIAnalyzer.test.ts
● Test suite failed to run

    src/services/ai/__tests__/AIAnalyzer.test.ts:30:23 - error TS2339: Property 'data' does not exist on type 'Result<Analysis>'.
      Property 'data' does not exist on type 'Failure'.

    30         expect(result.data).toEqual(expectedAnalysis);
                             ~~~~

FAIL src/validation/implementations/ValidationRuleEngine/ValidationRuleEngine.test.ts
● Test suite failed to run

    src/validation/implementations/ValidationRuleEngine/ValidationRuleEngine.ts:1:39 - error TS2307: Cannot find module '../../interfaces/IValidationRuleEngine' or its corresponding type declarations.

    1 import { IValidationRuleEngine } from '../../interfaces/IValidationRuleEngine';
                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/ratelimiting/RateLimiter.test.ts
● Test suite failed to run

    src/services/ratelimiting/RateLimiter.test.ts:2:28 - error TS2307: Cannot find module '../../test/mocks/MockLogger' or its corresponding type declarations.

    2 import { MockLogger } from '../../test/mocks/MockLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiResponseHandler/ApiResponseHandler.test.ts
● Test suite failed to run

    src/api/implementations/ApiResponseHandler/ApiResponseHandler.ts:1:37 - error TS2307: Cannot find module '../../interfaces/IApiResponseHandler' or its corresponding type declarations.

    1 import { IApiResponseHandler } from '../../interfaces/IApiResponseHandler';
                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/validation/implementations/ValidationLogger/ValidationLogger.test.ts
● Test suite failed to run

    src/validation/implementations/ValidationLogger/ValidationLogger.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IValidationLogger' or its corresponding type declarations.

    1 import { IValidationLogger } from '../../interfaces/IValidationLogger';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseTransitioner/PhaseTransitioner.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseTransitioner/PhaseTransitioner.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IPhaseTransitioner' or its corresponding type declarations.

    1 import { IPhaseTransitioner } from '../../interfaces/IPhaseTransitioner';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseStateManager/PhaseStateManager.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseStateManager/PhaseStateManager.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IPhaseStateManager' or its corresponding type declarations.

    1 import { IPhaseStateManager } from '../../interfaces/IPhaseStateManager';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiRequestBuilder/ApiRequestBuilder.test.ts
● Test suite failed to run

    src/api/implementations/ApiRequestBuilder/ApiRequestBuilder.ts:1:36 - error TS2307: Cannot find module '../../interfaces/IApiRequestBuilder' or its corresponding type declarations.

    1 import { IApiRequestBuilder } from '../../interfaces/IApiRequestBuilder';
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StatePersistence/StatePersistence.test.ts
● Test suite failed to run

    src/state/implementations/StatePersistence/StatePersistence.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IStatePersistence' or its corresponding type declarations.

    1 import { IStatePersistence } from '../../interfaces/IStatePersistence';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheInvalidator/CacheInvalidator.test.ts
● Test suite failed to run

    src/cache/implementations/CacheInvalidator/CacheInvalidator.ts:1:35 - error TS2307: Cannot find module '../../interfaces/ICacheInvalidator' or its corresponding type declarations.

    1 import { ICacheInvalidator } from '../../interfaces/ICacheInvalidator';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigValidator/ConfigValidator.test.ts
● Test suite failed to run

    src/config/implementations/ConfigValidator/ConfigValidator.ts:1:34 - error TS2307: Cannot find module '../../interfaces/IConfigValidator' or its corresponding type declarations.

    1 import { IConfigValidator } from '../../interfaces/IConfigValidator';
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/auth/implementations/AuthTokenManager/AuthTokenManager.test.ts
● Test suite failed to run

    src/auth/implementations/AuthTokenManager/AuthTokenManager.ts:1:35 - error TS2307: Cannot find module '../../interfaces/IAuthTokenManager' or its corresponding type declarations.

    1 import { IAuthTokenManager } from '../../interfaces/IAuthTokenManager';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateValidator/StateValidator.test.ts
● Test suite failed to run

    src/state/implementations/StateValidator/StateValidator.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IStateValidator' or its corresponding type declarations.

    1 import { IStateValidator } from '../../interfaces/IStateValidator';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseValidator/PhaseValidator.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseValidator/PhaseValidator.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IPhaseValidator' or its corresponding type declarations.

    1 import { IPhaseValidator } from '../../interfaces/IPhaseValidator';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheStrategy/CacheStrategy.test.ts
● Test suite failed to run

    src/cache/implementations/CacheStrategy/CacheStrategy.ts:1:32 - error TS2307: Cannot find module '../../interfaces/ICacheStrategy' or its corresponding type declarations.

    1 import { ICacheStrategy } from '../../interfaces/ICacheStrategy';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiRateLimiter/ApiRateLimiter.test.ts
● Test suite failed to run

    src/api/implementations/ApiRateLimiter/ApiRateLimiter.ts:1:33 - error TS2307: Cannot find module '../../interfaces/IApiRateLimiter' or its corresponding type declarations.

    1 import { IApiRateLimiter } from '../../interfaces/IApiRateLimiter';
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateObserver/StateObserver.test.ts
● Test suite failed to run

    src/state/implementations/StateObserver/StateObserver.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IStateObserver' or its corresponding type declarations.

    1 import { IStateObserver } from '../../interfaces/IStateObserver';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigWatcher/ConfigWatcher.test.ts
● Test suite failed to run

    src/config/implementations/ConfigWatcher/ConfigWatcher.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IConfigWatcher' or its corresponding type declarations.

    1 import { IConfigWatcher } from '../../interfaces/IConfigWatcher';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigUpdater/ConfigUpdater.test.ts
● Test suite failed to run

    src/config/implementations/ConfigUpdater/ConfigUpdater.ts:1:32 - error TS2307: Cannot find module '../../interfaces/IConfigUpdater' or its corresponding type declarations.

    1 import { IConfigUpdater } from '../../interfaces/IConfigUpdater';
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/state/implementations/StateUpdater/StateUpdater.test.ts
● Test suite failed to run

    src/state/implementations/StateUpdater/StateUpdater.ts:1:31 - error TS2307: Cannot find module '../../interfaces/IStateUpdater' or its corresponding type declarations.

    1 import { IStateUpdater } from '../../interfaces/IStateUpdater';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/config/implementations/ConfigLoader/ConfigLoader.test.ts
● Test suite failed to run

    src/config/implementations/ConfigLoader/ConfigLoader.ts:1:31 - error TS2307: Cannot find module '../../interfaces/IConfigLoader' or its corresponding type declarations.

    1 import { IConfigLoader } from '../../interfaces/IConfigLoader';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheStorage/CacheStorage.test.ts
● Test suite failed to run

    src/cache/implementations/CacheStorage/CacheStorage.ts:1:31 - error TS2307: Cannot find module '../../interfaces/ICacheStorage' or its corresponding type declarations.

    1 import { ICacheStorage } from '../../interfaces/ICacheStorage';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/cache/implementations/CacheMonitor/CacheMonitor.test.ts
● Test suite failed to run

    src/cache/implementations/CacheMonitor/CacheMonitor.ts:1:31 - error TS2307: Cannot find module '../../interfaces/ICacheMonitor' or its corresponding type declarations.

    1 import { ICacheMonitor } from '../../interfaces/ICacheMonitor';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/api/implementations/ApiLogger/ApiLogger.test.ts
● Test suite failed to run

    src/api/implementations/ApiLogger/ApiLogger.ts:1:28 - error TS2307: Cannot find module '../../interfaces/IApiLogger' or its corresponding type declarations.

    1 import { IApiLogger } from '../../interfaces/IApiLogger';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/phase/implementations/PhaseLogger/PhaseLogger.test.ts
● Test suite failed to run

    src/phase/implementations/PhaseLogger/PhaseLogger.ts:1:30 - error TS2307: Cannot find module '../../interfaces/IPhaseLogger' or its corresponding type declarations.

    1 import { IPhaseLogger } from '../../interfaces/IPhaseLogger';
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/logging/implementations/Logger/Logger.test.ts
● Test suite failed to run

    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:133:18)
      at node_modules/@jest/core/build/TestScheduler.js:254:19
      at node_modules/emittery/index.js:363:13
          at Array.map (<anonymous>)
      at Emittery.emit (node_modules/emittery/index.js:361:23)

FAIL src/auth/implementations/AuthLogger/AuthLogger.test.ts
● Test suite failed to run

    src/auth/implementations/AuthLogger/AuthLogger.ts:1:29 - error TS2307: Cannot find module '../../interfaces/IAuthLogger' or its corresponding type declarations.

    1 import { IAuthLogger } from '../../interfaces/IAuthLogger';
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FAIL src/services/errors/ErrorMessageProvider.test.ts
● Test suite failed to run

    src/services/errors/ErrorMessageProvider.test.ts:110:33 - error TS2339: Property 'isRecoverable' does not exist on type 'IErrorMessageProvider'.

    110                 expect(provider.isRecoverable(error)).toBe(expected);
                                        ~~~~~~~~~~~~~

Test Suites: 33 failed, 33 total
Tests: 0 total
Snapshots: 0 total
Time: 27.621 s
Ran all test suites.

# 📝 Summary

Check typescript_errors.log for error tracking details
Check coverage/lcov-report/index.html for test coverage details
