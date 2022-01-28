import styles from './HolidaysList.css';

export default function HolidaysList({ holidays, filteredHolidays }) {
  return (
    <section className={styles.section}>
      {filteredHolidays.length === 0
        ? holidays.map((holiday) => (
            <div key={holiday.id} className={styles.card}>
              <h1>{holiday.name}</h1>
              <h2>{holiday.date}</h2>
            </div>
          ))
        : filteredHolidays.map((holiday) => (
            <div key={holiday.id} className={styles.card}>
              <h1>{holiday.name}</h1>
              <h2>{holiday.date}</h2>
            </div>
          ))}
    </section>
  );
}
