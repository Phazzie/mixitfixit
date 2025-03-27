interface INavigationManager {
    getCurrentRoute(): Route;
    navigateTo(path: string): void;
    handleRouteChange(): void;
}

export class NavigationManager implements INavigationManager {
    private readonly router: Router;
    private readonly routeValidator: RouteValidator;
    private readonly navigationLogger: NavigationLogger;

    constructor(
        router: Router,
        routeValidator: RouteValidator,
        navigationLogger: NavigationLogger
    ) {
        this.router = router;
        this.routeValidator = routeValidator;
        this.navigationLogger = navigationLogger;
    }

    getCurrentRoute(): Route {
        return this.router.currentRoute;
    }

    navigateTo(path: string): void {
        if (!this.routeValidator.isValid(path)) {
            throw new InvalidRouteError(path);
        }
        this.navigationLogger.logNavigation(path);
        this.router.navigate(path);
    }

    handleRouteChange(): void {
        const newRoute = this.getCurrentRoute();
        this.navigationLogger.logRouteChange(newRoute);
    }
}
