import { useState, useEffect } from 'react';
import { fetchHolidays } from '../../services/holidays';

import Controls from '../../components/Controls/Controls';
import HolidaysList from '../../components/HolidaysList/HolidaysList';

export default function Compendium() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const search = holidays.filter((holiday) =>
      holiday.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHolidays(search);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHolidays();
      data.map((item, index) => (item.id = `${item.name}-${index}`));
      const publicHolidays = await data.filter(
        (item) => item.types[0] === 'Public'
      );
      setHolidays(publicHolidays);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Please wait...</p>;

  return (
    <>
      <Controls {...{ query, setQuery, handleSearch }} />
      <HolidaysList {...{ holidays, filteredHolidays }} />
    </>
  );
}
