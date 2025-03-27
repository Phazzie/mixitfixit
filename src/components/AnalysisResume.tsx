interface AnalysisResumeProps {
    progressTracker: IProgressTracker;
    onResume: (phase: string, data: unknown) => void;
}

export const AnalysisResume: React.FC<AnalysisResumeProps> = ({ progressTracker, onResume }) => {
    const [lastPhase, setLastPhase] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLastPhase();
    }, []);

    const loadLastPhase = async () => {
        const phase = await progressTracker.getLastPhase();
        setLastPhase(phase);
    };

    const handleResume = async () => {
        if (!lastPhase) return;
        
        setLoading(true);
        try {
            const data = await progressTracker.loadCheckpoint(lastPhase);
            onResume(lastPhase, data);
        } catch (error) {
            // Error handling will be managed by global error boundary
            throw error;
        } finally {
            setLoading(false);
        }
    };

    if (!lastPhase) return null;

    return (
        <div className="resume-container">
            <h3>Resume Previous Analysis</h3>
            <p>You have an unfinished analysis from phase: {lastPhase}</p>
            <button 
                onClick={handleResume}
                disabled={loading}
            >
                {loading ? 'Resuming...' : 'Resume Analysis'}
            </button>
        </div>
    );
}