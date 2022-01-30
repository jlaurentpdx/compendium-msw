import styles from './HolidaysList.css';

export default function HolidaysList({ holidays, filteredHolidays }) {
  return (
    <section className={styles.section}>
      {filteredHolidays.length > 0
        ? filteredHolidays.map((holiday) => (
            <div key={holiday.id} className={styles.card}>
              <h1>{holiday.name}</h1>
              <h2>{holiday.date}</h2>
            </div>
          ))
        : holidays.map((holiday) => (
            <div key={holiday.id} className={styles.card}>
              <h1>{holiday.name}</h1>
              <h2>{holiday.date}</h2>
            </div>
          ))}
    </section>
  );
}
