const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const buildTripWhatsAppMessage = (itinerary, contact) => {
  const { travelDetails, accommodation, houseboat, destinations, activities, days, preferences, specialRequirements } =
    itinerary;

  const lines = [];

  lines.push('Hello Kuttanad Tourism,');
  lines.push('');
  lines.push('I would like to enquire about a customized Kerala trip.');
  lines.push('');
  lines.push(`Customer Name: ${contact.customerName}`);
  lines.push(`Phone: ${contact.phone}`);
  if (contact.email) lines.push(`Email: ${contact.email}`);
  lines.push('');

  lines.push('Travel Dates:');
  lines.push(`${formatDate(travelDetails.startDate)} - ${formatDate(travelDetails.endDate)}`);
  lines.push('');
  lines.push(`Number of Days: ${travelDetails.numberOfDays}`);
  lines.push(`Guests: ${travelDetails.guests}`);
  lines.push('');

  if (accommodation) {
    lines.push('Accommodation:');
    lines.push(accommodation);
    lines.push('');
  }

  if (houseboat) {
    lines.push('Property:');
    lines.push(houseboat.title);
    lines.push('');
  }

  if (destinations.length > 0) {
    lines.push('Destinations:');
    destinations.forEach((d) => lines.push(`- ${d.name}`));
    lines.push('');
  }

  if (activities.length > 0) {
    lines.push('Activities:');
    activities.forEach((a) => lines.push(`- ${a.name}`));
    lines.push('');
  }

  if (days.length > 0) {
    lines.push('Customized Itinerary:');
    lines.push('');
    days.forEach((day) => {
      lines.push(`Day ${day.dayNumber}: ${day.title}`);
      day.destinationIds.forEach((id) => {
        const d = destinations.find((x) => x._id === id);
        if (d) lines.push(`- ${d.name}`);
      });
      day.activityIds.forEach((id) => {
        const a = activities.find((x) => x._id === id);
        if (a) lines.push(`- ${a.name}`);
      });
      if (day.notes) lines.push(`Notes: ${day.notes}`);
      lines.push('');
    });
  }

  if (preferences.foodPreference) {
    lines.push('Food Preferences:');
    lines.push(preferences.foodPreference);
    lines.push('');
  }

  if (specialRequirements) {
    lines.push('Special Requirements:');
    lines.push(specialRequirements);
    lines.push('');
  }

  lines.push('Please share availability and pricing.');
  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
};
