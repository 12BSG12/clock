import styles from './App.module.css';
import Lab6 from './Labs/Lab6';

const App = () => { 
  return (
    <div >
      <div className={styles.App}>
        <p>Выполнил студент группы АСУ-20 Глушенков В.В.</p>
      </div>
      <Lab6 />
    </div>
  );
};

export default App;
