// Single Responsibility: Route handling only
export class AnalysisController {
  constructor(private readonly geminiService: GeminiService) {}

  async analyze(req: Request, res: Response, next: NextFunction) {
    const result = await this.geminiService.analyze({
      apiKey: req.headers['x-api-key'],
      statements: [req.body.statement1, req.body.statement2]
    });

    if (!result.success) {
      return next(result.error);
    }

    res.json(result.data);
  }
}

// Router setup
const router = express.Router();
const controller = new AnalysisController(geminiService);
router.post('/analyze', controller.analyze.bind(controller));
