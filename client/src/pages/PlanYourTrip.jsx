import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import StepProgress from '../features/itinerary/StepProgress';
import TripSummary from '../features/itinerary/TripSummary';
import MobileSummaryDrawer from '../components/MobileSummaryDrawer';
import StepTravelDetails from '../features/itinerary/steps/StepTravelDetails';
import StepAccommodation from '../features/itinerary/steps/StepAccommodation';
import StepDestinations from '../features/itinerary/steps/StepDestinations';
import StepActivities from '../features/itinerary/steps/StepActivities';
import StepPreferences from '../features/itinerary/steps/StepPreferences';
import StepReview from '../features/itinerary/steps/StepReview';
import SubmitTripCTA from '../features/itinerary/SubmitTripCTA';
import Button from '../components/Button';
import { setStep, nextStep, prevStep } from '../features/itinerary/itinerarySlice';

const STEP_COMPONENTS = {
  1: StepTravelDetails,
  2: StepAccommodation,
  3: StepDestinations,
  4: StepActivities,
  5: StepPreferences,
  6: StepReview,
};

const isStepValid = (step, itinerary) => {
  switch (step) {
    case 1: {
      const { startDate, endDate, numberOfDays } = itinerary.travelDetails;
      return Boolean(startDate && endDate && numberOfDays > 0);
    }
    case 2:
      return Boolean(itinerary.houseboat);
    case 3:
      return itinerary.destinations.length > 0;
    case 4:
    case 5:
      return true; // experiences and preferences are optional
    default:
      return true;
  }
};

const PlanYourTrip = () => {
  const dispatch = useDispatch();
  const itinerary = useSelector((s) => s.itinerary);
  const { step } = itinerary;
  const StepComponent = STEP_COMPONENTS[step];
  const canGoNext = isStepValid(step, itinerary);

  // Tracked here (not inside SubmitTripCTA's parent, StepReview) specifically
  // so that resetting the itinerary on a successful submit can't hide the
  // confirmation: StepReview has its own "set your dates first" guard that
  // would otherwise re-trigger the instant the draft clears. SubmitTripCTA
  // itself is rendered in the same tree position either way, so its own
  // internal success state is never lost by toggling this.
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Helmet>
        <title>Plan Your Trip | Kuttanad Tourism</title>
        <meta
          name="description"
          content="Build a custom Kuttanad itinerary — pick your stay, destinations, and experiences, then review a day-by-day plan."
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 lg:pb-8">
        {!submitted && (
          <div className="mb-8">
            <StepProgress current={step} onStepClick={(s) => dispatch(setStep(s))} />
          </div>
        )}

        <div className={submitted ? 'mx-auto max-w-xl' : 'grid gap-8 lg:grid-cols-[1fr_300px]'}>
          <div className={submitted ? '' : 'rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm'}>
            {!submitted && <StepComponent />}

            {(step === 6 || submitted) && (
              <div className={submitted ? '' : 'mt-8'}>
                <SubmitTripCTA
                  onSuccess={() => setSubmitted(true)}
                  onPlanAnother={() => setSubmitted(false)}
                />
              </div>
            )}

            {!submitted && (
              <div className="mt-8 flex items-center justify-between border-t border-backwater-100 pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => dispatch(prevStep())}
                  className={step === 1 ? 'invisible' : ''}
                >
                  Back
                </Button>

                {step < 6 ? (
                  <Button type="button" variant="primary" onClick={() => dispatch(nextStep())} disabled={!canGoNext}>
                    Continue
                  </Button>
                ) : (
                  <span />
                )}
              </div>
            )}
          </div>

          {!submitted && (
            <aside className="hidden rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm lg:block">
              <p className="mb-4 font-display text-lg font-semibold text-backwater-900">Trip Summary</p>
              <TripSummary />
            </aside>
          )}
        </div>
      </div>

      {!submitted && <MobileSummaryDrawer />}
    </>
  );
};

export default PlanYourTrip;