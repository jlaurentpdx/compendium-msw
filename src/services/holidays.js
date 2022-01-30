export const fetchHolidays = async () => {
  const resp = await fetch(
    'https://date.nager.at/api/v3/PublicHolidays/2022/US'
  );
  const data = await resp.json();
  data.map((item, index) => (item.id = `${item.name}-${index}`));
  const filterData = await data.filter((item) => item.types[0] === 'Public');

  return filterData;
};
