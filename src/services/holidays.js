export const fetchHolidays = async () => {
  const resp = await fetch(
    'https://date.nager.at/api/v3/PublicHolidays/2022/US'
  );
  const data = await resp.json();

  return data;
};
