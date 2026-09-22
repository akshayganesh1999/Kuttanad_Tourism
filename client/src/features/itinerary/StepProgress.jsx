const STEPS = [
  { number: '01', label: 'Travel' },
  { number: '02', label: 'Stay' },
  { number: '03', label: 'Explore' },
  { number: '04', label: 'Experiences' },
  { number: '05', label: 'Preferences' },
  { number: '06', label: 'Review' },
];

const StepProgress = ({ current, onStepClick }) => (
  <ol className="flex items-center gap-1 overflow-x-auto pb-2">
    {STEPS.map((step, idx) => {
      const stepNum = idx + 1;
      const isActive = stepNum === current;
      const isDone = stepNum < current;

      return (
        <li key={step.number} className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => isDone && onStepClick(stepNum)}
            disabled={!isDone}
            className={`flex items-center gap-2 whitespace-nowrap text-xs font-semibold sm:text-sm ${
              isActive ? 'text-backwater-900' : isDone ? 'text-backwater-600' : 'text-charcoal-800/40'
            }`}
          >
            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs ${
                isActive
                  ? 'border-backwater-700 bg-backwater-700 text-white'
                  : isDone
                  ? 'border-backwater-600 text-backwater-600'
                  : 'border-backwater-200'
              }`}
            >
              {step.number}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
          {stepNum < STEPS.length && <span className="h-px flex-1 bg-backwater-100" />}
        </li>
      );
    })}
  </ol>
);

export default StepProgress;
